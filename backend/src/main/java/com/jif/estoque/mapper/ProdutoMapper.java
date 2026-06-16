package com.jif.estoque.mapper;

import com.jif.estoque.dto.ProdutoDTO;
import com.jif.estoque.entity.Produto;

public class ProdutoMapper {

    public static ProdutoDTO toDTO(Produto produto){
        ProdutoDTO dto = new ProdutoDTO();
        dto.setId(produto.id);
        dto.setCodigo(produto.codigo);
        dto.setNome(produto.nome);
        dto.setDescricao(produto.descricao);
        dto.setCategoria(produto.categoria);
        dto.setUnidade(produto.unidade);
        dto.setPrecoCusto(produto.precoCusto);
        dto.setEstoqueMin(produto.estoqueMin);
        dto.setFornecedorId(produto.fornecedor != null ? produto.fornecedor.id : null);
        dto.setAtivo(produto.ativo);
        return dto;
    }

    public static Produto toEntity(ProdutoDTO produtoDTO) {
        Produto produto = new Produto();
        produto.codigo = produtoDTO.getCodigo();
        produto.nome = produtoDTO.getNome();
        produto.descricao = produtoDTO.getDescricao();
        produto.categoria = produtoDTO.getCategoria();
        produto.unidade = produtoDTO.getUnidade();
        produto.precoCusto = produtoDTO.getPrecoCusto();
        produto.estoqueMin = produtoDTO.getEstoqueMin();
        produto.ativo = produtoDTO.getAtivo() != null ? produtoDTO.getAtivo() : true;
        return produto;
    }

}
