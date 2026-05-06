package com.example.brisa.dtos.people;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PeopleCreateLinkRequestDTO {
    private Long programaId;
    private Long turmaId;
    private Long etapaId;
    private String statusInicial;
    private String nome;
    private LocalDate dataNascimento;
    private String genero;
    private String cota;
    private String cpf;
    private String email;
    private String telefone;
    private String linkedin;
    private String endereco;
    private String estado;
    private String cidade;
    private String cep;
    private String complementoEndereco;
    private String tipoFormacao;
    private String instituicao;
    private String curso;
    private String statusFormacao;
    private LocalDate dataConclusao;
}
