package com.jif.estoque.dto;

import com.jif.estoque.enums.TipoMovimentacao;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class MovimentacaoDTO {

    private Long id;
    private TipoMovimentacao tipo;
    private Long produtoId;
    private BigDecimal quantidade;
    private BigDecimal custoUnit;
    private String docRef;
    private String motivo;
    private LocalDateTime dataHora;
}