package com.jif.estoque.service;

import com.jif.estoque.dto.ProdutoDTO;
import com.jif.estoque.entity.Produto;
import com.jif.estoque.mapper.ProdutoMapper;
import com.jif.estoque.repository.ProdutoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ProdutoService {

    @Inject
    ProdutoRepository produtoRepository;

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
}