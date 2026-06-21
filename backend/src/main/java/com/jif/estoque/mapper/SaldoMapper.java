package com.jif.estoque.mapper;

import com.jif.estoque.dto.SaldoDTO;
import com.jif.estoque.entity.EstoqueSaldo;
import com.jif.estoque.entity.Produto;

import java.math.BigDecimal;

public class SaldoMapper {

    public static SaldoDTO toDTO(EstoqueSaldo saldo) {
        SaldoDTO dto = new SaldoDTO();
        dto.setProdutoId(saldo.produto.id);
        dto.setCodigoProduto(saldo.produto.codigo);
        dto.setNomeProduto(saldo.produto.nome);
        dto.setQuantidade(saldo.quantidade);
        dto.setCustoMedio(saldo.custoMedio);
        return dto;
    }

    public static SaldoDTO toDTOZerado(Produto produto) {
        SaldoDTO dto = new SaldoDTO();
        dto.setProdutoId(produto.id);
        dto.setCodigoProduto(produto.codigo);
        dto.setNomeProduto(produto.nome);
        dto.setQuantidade(BigDecimal.ZERO);
        dto.setCustoMedio(BigDecimal.ZERO);
        return dto;
    }
}