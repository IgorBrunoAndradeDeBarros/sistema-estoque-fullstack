package com.jif.estoque.mapper;

import com.jif.estoque.dto.ProdutoSaldoDTO;
import com.jif.estoque.entity.EstoqueSaldo;
import com.jif.estoque.entity.Produto;

public class ProdutoSaldoMapper {

    public static ProdutoSaldoDTO toSaldoDTO(Produto produto, EstoqueSaldo saldo) {
        ProdutoSaldoDTO dto = new ProdutoSaldoDTO();
        dto.setId(produto.id);
        dto.setCodigo(produto.codigo);
        dto.setNome(produto.nome);
        dto.setEstoqueMin(produto.estoqueMin);
        dto.setQuantidadeAtual(saldo != null ? saldo.quantidade : null);
        return dto;
    }
}