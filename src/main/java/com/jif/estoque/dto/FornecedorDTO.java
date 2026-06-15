package com.jif.estoque.dto;

import lombok.Data;

@Data
public class FornecedorDTO {

    private Long id;
    private String razaoSocial;
    private String cnpj;
    private String email;
    private String telefone;
    private Boolean ativo;
}