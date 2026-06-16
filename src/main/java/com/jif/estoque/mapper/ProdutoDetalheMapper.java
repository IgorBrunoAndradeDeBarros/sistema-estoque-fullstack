package com.jif.estoque.mapper;

import com.jif.estoque.dto.ProdutoDetalheDTO;
import com.jif.estoque.entity.EstoqueSaldo;
import com.jif.estoque.entity.Produto;

public class ProdutoDetalheMapper {

    public static ProdutoDetalheDTO toDTO(Produto produto, EstoqueSaldo saldo) {
        ProdutoDetalheDTO dto = new ProdutoDetalheDTO();
        dto.setId(produto.id);
        dto.setCodigo(produto.codigo);
        dto.setNome(produto.nome);
        dto.setDescricao(produto.descricao);
        dto.setCategoria(produto.categoria);
        dto.setUnidade(produto.unidade);
        dto.setPrecoCusto(produto.precoCusto);
        dto.setEstoqueMin(produto.estoqueMin);
        dto.setAtivo(produto.ativo);
        dto.setNomeFornecedor(produto.fornecedor != null ? produto.fornecedor.razaoSocial : null);
        dto.setQuantidade(saldo != null ? saldo.quantidade : java.math.BigDecimal.ZERO);
        dto.setCustoMedio(saldo != null ? saldo.custoMedio : java.math.BigDecimal.ZERO);
        return dto;
    }
}