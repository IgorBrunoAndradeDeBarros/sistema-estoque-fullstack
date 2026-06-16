package com.jif.estoque.service;

import com.jif.estoque.dto.SaldoDTO;
import com.jif.estoque.entity.EstoqueSaldo;
import com.jif.estoque.entity.Produto;
import com.jif.estoque.mapper.SaldoMapper;
import com.jif.estoque.repository.EstoqueSaldoRepository;
import com.jif.estoque.repository.ProdutoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;

import java.util.List;

@ApplicationScoped
public class SaldoService {

    @Inject
    EstoqueSaldoRepository estoqueSaldoRepository;

    @Inject
    ProdutoRepository produtoRepository;

    public List<SaldoDTO> listar() {
        List<EstoqueSaldo> saldos = estoqueSaldoRepository.listAll();
        return saldos.stream().map(SaldoMapper::toDTO).toList();
    }

    public SaldoDTO buscarPorProdutoId(Long produtoId) {
        Produto produto = produtoRepository.findById(produtoId);
        if (produto == null) {
            throw new WebApplicationException(
                    Response.status(404).entity("Produto não encontrado").build()
            );
        }

        EstoqueSaldo saldo = estoqueSaldoRepository.find("produto", produto).firstResult();

        if (saldo == null) {
            return SaldoMapper.toDTOZerado(produto);
        }

        return SaldoMapper.toDTO(saldo);
    }
}