package com.jif.estoque.dto;

import com.jif.estoque.enums.TipoAlerta;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AlertaDTO {

    private Long id;
    private Long produtoId;
    private String nomeProduto;
    private TipoAlerta tipo;
    private String mensagem;
    private Boolean lido;
    private LocalDateTime criadoEm;
}