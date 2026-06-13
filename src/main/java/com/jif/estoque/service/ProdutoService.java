package com.jif.estoque.service;

import com.jif.estoque.dto.ProdutoDTO;
import com.jif.estoque.dto.ProdutoSaldoDTO;
import com.jif.estoque.entity.EstoqueSaldo;
import com.jif.estoque.entity.Produto;
import com.jif.estoque.mapper.ProdutoMapper;
import com.jif.estoque.mapper.ProdutoSaldoMapper;
import com.jif.estoque.repository.EstoqueSaldoRepository;
import com.jif.estoque.repository.FornecedorRepository;
import com.jif.estoque.repository.ProdutoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ProdutoService {

    @Inject
    ProdutoRepository produtoRepository;

    @Inject
    FornecedorRepository fornecedorRepository;

    @Inject
    EstoqueSaldoRepository estoqueSaldoRepository;

    public List<ProdutoDTO> listar(String nome, Boolean ativo, String categoria) {

        List<Produto> produtos;

        if (nome != null || ativo != null || categoria != null) {
            StringBuilder query = new StringBuilder("1=1");
            List<Object> params = new ArrayList<>();
            int i = 0;

            if (nome != null) {
                query.append(" and lower(nome) like ?").append(i++);
                params.add("%" + nome.toLowerCase() + "%");
            }
            if (ativo != null) {
                query.append(" and ativo = ?").append(i++);
                params.add(ativo);
            }
            if (categoria != null) {
                query.append(" and lower(categoria) like ?").append(i++);
                params.add("%" +categoria.toLowerCase() + "%");
            }

            produtos = produtoRepository.list(query.toString(), params.toArray());
        } else {
            produtos = produtoRepository.listAll();
        }
        return produtos.stream().map(ProdutoMapper::toDTO).toList();
    }

    public ProdutoDTO buscarPorId(Long id) {
        Produto produto = produtoRepository.findById(id);
        if (produto == null) {
            throw new WebApplicationException("Produto não encontrado", 404);
        }
        return ProdutoMapper.toDTO(produto);
    }

    @Transactional
    public ProdutoDTO cadastrar(ProdutoDTO dto) {
        Produto produto = ProdutoMapper.toEntity(dto);

        if (dto.getFornecedorId() != null) {
            produto.fornecedor = fornecedorRepository.findById(dto.getFornecedorId());
        }

        produtoRepository.persist(produto);
        return ProdutoMapper.toDTO(produto);
    }

    @Transactional
    public ProdutoDTO atualizar(Long id, ProdutoDTO dto) {
        Produto produto = produtoRepository.findById(id);
        if (produto == null) {
            throw new WebApplicationException("Produto não encontrado", 404);
        }

        produto.codigo = dto.getCodigo();
        produto.nome = dto.getNome();
        produto.descricao = dto.getDescricao();
        produto.categoria = dto.getCategoria();
        produto.unidade = dto.getUnidade();
        produto.precoCusto = dto.getPrecoCusto();
        produto.estoqueMin = dto.getEstoqueMin();
        produto.ativo = dto.getAtivo() != null ? dto.getAtivo() : produto.ativo;

        if (dto.getFornecedorId() != null) {
            produto.fornecedor = fornecedorRepository.findById(dto.getFornecedorId());
        }

        return ProdutoMapper.toDTO(produto);
    }

    @Transactional
    public void desativar(Long id) {
        Produto produto = produtoRepository.findById(id);
        if (produto == null) {
            throw new WebApplicationException("Produto não encontrado", 404);
        }
        produto.ativo = false;
    }

    public List<ProdutoSaldoDTO> listarCriticos() {
        List<Produto> produtos = produtoRepository.list("ativo = true");

        return produtos.stream()
                .map(produto -> {
                    EstoqueSaldo saldo = estoqueSaldoRepository.find("produto", produto).firstResult();
                    if (saldo == null || saldo.quantidade.compareTo(produto.estoqueMin) <= 0) {
                        return ProdutoSaldoMapper.toSaldoDTO(produto, saldo);
                    }
                    return null;
                })
                .filter(dto -> dto != null)
                .toList();
    }

}