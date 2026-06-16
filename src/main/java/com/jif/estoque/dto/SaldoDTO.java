package com.jif.estoque.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class SaldoDTO {

    private Long produtoId;
    private String codigoProduto;
    private String nomeProduto;
    private BigDecimal quantidade;
    private BigDecimal custoMedio;
}