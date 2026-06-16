package com.jif.estoque.mapper;

import com.jif.estoque.dto.AlertaDTO;
import com.jif.estoque.entity.Alerta;

public class AlertaMapper {

    public static AlertaDTO toDTO(Alerta alerta) {
        AlertaDTO dto = new AlertaDTO();
        dto.setId(alerta.id);
        dto.setProdutoId(alerta.produto.id);
        dto.setNomeProduto(alerta.produto.nome);
        dto.setTipo(alerta.tipoAlerta);
        dto.setMensagem(alerta.mensagem);
        dto.setLido(alerta.lido);
        dto.setCriadoEm(alerta.criadoEm);
        return dto;
    }
}