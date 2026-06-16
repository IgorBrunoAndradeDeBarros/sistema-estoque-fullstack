package com.jif.estoque.service;

import com.jif.estoque.dto.MovimentacaoDTO;
import com.jif.estoque.entity.Alerta;
import com.jif.estoque.entity.EstoqueSaldo;
import com.jif.estoque.entity.Movimentacao;
import com.jif.estoque.entity.Produto;
import com.jif.estoque.enums.TipoAlerta;
import com.jif.estoque.enums.TipoMovimentacao;
import com.jif.estoque.mapper.MovimentacaoMapper;
import com.jif.estoque.repository.AlertaRepository;
import com.jif.estoque.repository.EstoqueSaldoRepository;
import com.jif.estoque.repository.MovimentacaoRepository;
import com.jif.estoque.repository.ProdutoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class MovimentacaoService {

    @Inject
    MovimentacaoRepository movimentacaoRepository;

    @Inject
    ProdutoRepository produtoRepository;

    @Inject
    EstoqueSaldoRepository estoqueSaldoRepository;

    @Transactional
    public MovimentacaoDTO registrarEntrada(MovimentacaoDTO dto) {
        Produto produto = produtoRepository.findById(dto.getProdutoId());
        if (produto == null) {
            throw new WebApplicationException("Produto não encontrado", 404);
        }

        Movimentacao movimentacao = MovimentacaoMapper.toEntity(dto, TipoMovimentacao.ENTRADA, produto);
        movimentacaoRepository.persist(movimentacao);

        EstoqueSaldo saldo = estoqueSaldoRepository.find("produto", produto).firstResult();
        if (saldo == null) {
            saldo = new EstoqueSaldo();
            saldo.produto = produto;
            saldo.quantidade = BigDecimal.ZERO;
            saldo.custoMedio = BigDecimal.ZERO;
        }

        BigDecimal valorAtual = saldo.quantidade.multiply(saldo.custoMedio);
        BigDecimal valorEntrada = dto.getQuantidade().multiply(dto.getCustoUnit());
        BigDecimal novaQuantidade = saldo.quantidade.add(dto.getQuantidade());

        saldo.custoMedio = valorAtual.add(valorEntrada).divide(novaQuantidade, 2, RoundingMode.HALF_UP);
        saldo.quantidade = novaQuantidade;

        if (saldo.id == null) {
            estoqueSaldoRepository.persist(saldo);
        }

        return MovimentacaoMapper.toDTO(movimentacao);
    }

    @Transactional
    public MovimentacaoDTO registrarSaida(MovimentacaoDTO dto) {
        Produto produto = produtoRepository.findById(dto.getProdutoId());
        if (produto == null) {
            throw new WebApplicationException(
                    Response.status(404).entity("Produto não encontrado").build()
            );
        }

        EstoqueSaldo saldo = estoqueSaldoRepository.find("produto", produto).firstResult();
        if (saldo == null || saldo.quantidade.compareTo(dto.getQuantidade()) < 0) {
            throw new WebApplicationException(
                    Response.status(400).entity("Saldo insuficiente para essa saída").build()
            );
        }

        Movimentacao movimentacao = MovimentacaoMapper.toEntity(dto, TipoMovimentacao.SAIDA, produto);
        movimentacaoRepository.persist(movimentacao);

        saldo.quantidade = saldo.quantidade.subtract(dto.getQuantidade());

        verificarAlerta(produto,saldo);

        return MovimentacaoMapper.toDTO(movimentacao);
    }

    @Transactional
    public MovimentacaoDTO registrarAjuste(MovimentacaoDTO dto) {
        if (dto.getMotivo() == null || dto.getMotivo().isBlank()) {
            throw new WebApplicationException(
                    Response.status(400).entity("Motivo é obrigatório para ajuste").build()
            );
        }

        Produto produto = produtoRepository.findById(dto.getProdutoId());
        if (produto == null) {
            throw new WebApplicationException(
                    Response.status(404).entity("Produto não encontrado").build()
            );
        }

        Movimentacao movimentacao = MovimentacaoMapper.toEntity(dto, TipoMovimentacao.AJUSTE, produto);
        movimentacaoRepository.persist(movimentacao);

        EstoqueSaldo saldo = estoqueSaldoRepository.find("produto", produto).firstResult();
        if (saldo == null) {
            saldo = new EstoqueSaldo();
            saldo.produto = produto;
            saldo.quantidade = BigDecimal.ZERO;
            saldo.custoMedio = BigDecimal.ZERO;
        }

        saldo.quantidade = saldo.quantidade.add(dto.getQuantidade());

        if (saldo.id == null) {
            estoqueSaldoRepository.persist(saldo);
        }

        verificarAlerta(produto, saldo );

        return MovimentacaoMapper.toDTO(movimentacao);
    }

    public List<MovimentacaoDTO> listar(TipoMovimentacao tipo, Long produtoId, LocalDateTime de, LocalDateTime ate) {

        List<Movimentacao> movimentacoes;

        if (tipo != null || produtoId != null || de != null || ate != null) {
            StringBuilder query = new StringBuilder("1=1");
            List<Object> params = new ArrayList<>();
            int i = 1;

            if (tipo != null) {
                query.append(" and tipo = ?").append(i++);
                params.add(tipo);
            }
            if (produtoId != null) {
                query.append(" and produto.id = ?").append(i++);
                params.add(produtoId);
            }
            if (de != null) {
                query.append(" and dataHora >= ?").append(i++);
                params.add(de);
            }
            if (ate != null) {
                query.append(" and dataHora <= ?").append(i++);
                params.add(ate);
            }

            movimentacoes = movimentacaoRepository.list(query.toString(), params.toArray());
        } else {
            movimentacoes = movimentacaoRepository.listAll();
        }

        return movimentacoes.stream().map(MovimentacaoMapper::toDTO).toList();
    }

    public MovimentacaoDTO buscarPorId(Long id) {
        Movimentacao movimentacao = movimentacaoRepository.findById(id);
        if (movimentacao == null) {
            throw new WebApplicationException(
                    Response.status(404).entity("Movimentação não encontrada").build()
            );
        }
        return MovimentacaoMapper.toDTO(movimentacao);
    }

    @Inject
    AlertaRepository alertaRepository;

    private void verificarAlerta(Produto produto, EstoqueSaldo saldo) {
        if (saldo.quantidade.compareTo(BigDecimal.ZERO) <= 0) {
            criarAlerta(produto, TipoAlerta.ESTOQUE_ZERADO,
                    "Estoque zerado para o produto " + produto.nome);
        } else if (saldo.quantidade.compareTo(produto.estoqueMin) <= 0) {
            criarAlerta(produto, TipoAlerta.ESTOQUE_MINIMO,
                    "Estoque abaixo do mínimo para o produto " + produto.nome);
        }
    }

    private void criarAlerta(Produto produto, TipoAlerta tipo, String mensagem) {
        Alerta alerta = new Alerta();
        alerta.produto = produto;
        alerta.tipoAlerta = tipo;
        alerta.mensagem = mensagem;
        alertaRepository.persist(alerta);
    }
}