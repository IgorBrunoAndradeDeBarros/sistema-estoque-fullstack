package com.jif.estoque.mapper;

import com.jif.estoque.dto.MovimentacaoDTO;
import com.jif.estoque.entity.Movimentacao;
import com.jif.estoque.entity.Produto;
import com.jif.estoque.enums.TipoMovimentacao;

public class MovimentacaoMapper {

    public static MovimentacaoDTO toDTO(Movimentacao movimentacao) {
        MovimentacaoDTO dto = new MovimentacaoDTO();
        dto.setId(movimentacao.id);
        dto.setTipo(movimentacao.tipo);
        dto.setProdutoId(movimentacao.produto.id);
        dto.setQuantidade(movimentacao.quantidade);
        dto.setCustoUnit(movimentacao.custoUnit);
        dto.setDocRef(movimentacao.docRef);
        dto.setMotivo(movimentacao.motivo);
        dto.setDataHora(movimentacao.dataHora);
        return dto;
    }

    public static Movimentacao toEntity(MovimentacaoDTO dto, TipoMovimentacao tipo, Produto produto) {
        Movimentacao movimentacao = new Movimentacao();
        movimentacao.tipo = tipo;
        movimentacao.produto = produto;
        movimentacao.quantidade = dto.getQuantidade();
        movimentacao.custoUnit = dto.getCustoUnit();
        movimentacao.docRef = dto.getDocRef();
        movimentacao.motivo = dto.getMotivo();
        return movimentacao;
    }
}