package com.jif.estoque.service;

import com.jif.estoque.dto.FornecedorDTO;
import com.jif.estoque.entity.Fornecedor;
import com.jif.estoque.mapper.FornecedorMapper;
import com.jif.estoque.repository.FornecedorRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class FornecedorService {

    @Inject
    FornecedorRepository fornecedorRepository;

    public List<FornecedorDTO> listar(String nome, String cnpj) {

        List<Fornecedor> fornecedores;

        if (nome != null || cnpj != null) {
            StringBuilder query = new StringBuilder("1=1");
            List<Object> params = new ArrayList<>();
            int i = 0;

            if (nome != null) {
                query.append(" and lower(razaoSocial) like ?").append(i++);
                params.add("%" + nome.toLowerCase() + "%");
            }
            if (cnpj != null) {
                query.append(" and cnpj = ?").append(i++);
                params.add(cnpj);
            }

            fornecedores = fornecedorRepository.list(query.toString(), params.toArray());
        } else {
            fornecedores = fornecedorRepository.listAll();
        }

        return fornecedores.stream().map(FornecedorMapper::toDTO).toList();
    }

    public FornecedorDTO buscarPorId(Long id) {
        Fornecedor fornecedor = fornecedorRepository.findById(id);
        if (fornecedor == null) {
            throw new WebApplicationException("Fornecedor não encontrado", 404);
        }
        return FornecedorMapper.toDTO(fornecedor);
    }

    @Transactional
    public FornecedorDTO cadastrar(FornecedorDTO dto) {
        Fornecedor fornecedor = FornecedorMapper.toEntity(dto);
        fornecedorRepository.persist(fornecedor);
        return FornecedorMapper.toDTO(fornecedor);
    }
    @Transactional
    public FornecedorDTO atualizar(Long id, FornecedorDTO dto) {
        Fornecedor fornecedor = fornecedorRepository.findById(id);
        if (fornecedor == null) {
            throw new WebApplicationException("Fornecedor não encontrado", 404);
        }

        fornecedor.razaoSocial = dto.getRazaoSocial();
        fornecedor.cnpj = dto.getCnpj();
        fornecedor.email = dto.getEmail();
        fornecedor.telefone = dto.getTelefone();
        fornecedor.ativo = dto.getAtivo() != null ? dto.getAtivo() : fornecedor.ativo;

        return FornecedorMapper.toDTO(fornecedor);
    }

    @Transactional
    public void desativar(Long id) {
        Fornecedor fornecedor = fornecedorRepository.findById(id);
        if (fornecedor == null) {
            throw new WebApplicationException("Fornecedor não encontrado", 404);
        }
        fornecedor.ativo = false;
    }
}