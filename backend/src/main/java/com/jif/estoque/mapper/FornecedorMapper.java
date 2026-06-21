package com.jif.estoque.mapper;

import com.jif.estoque.dto.FornecedorDTO;
import com.jif.estoque.entity.Fornecedor;

public class FornecedorMapper {

    public static FornecedorDTO toDTO(Fornecedor fornecedor) {
        FornecedorDTO dto = new FornecedorDTO();
        dto.setId(fornecedor.id);
        dto.setRazaoSocial(fornecedor.razaoSocial);
        dto.setCnpj(fornecedor.cnpj);
        dto.setEmail(fornecedor.email);
        dto.setTelefone(fornecedor.telefone);
        dto.setAtivo(fornecedor.ativo);
        return dto;
    }

    public static Fornecedor toEntity(FornecedorDTO dto) {
        Fornecedor fornecedor = new Fornecedor();
        fornecedor.razaoSocial = dto.getRazaoSocial();
        fornecedor.cnpj = dto.getCnpj();
        fornecedor.email = dto.getEmail();
        fornecedor.telefone = dto.getTelefone();
        fornecedor.ativo = dto.getAtivo() != null ? dto.getAtivo() : true;
        return fornecedor;
    }
}