-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE Penguin;
USE Penguin;

CREATE TABLE Usuario (
    idUsuario 			INT 			PRIMARY KEY AUTO_INCREMENT,
    cpf 				CHAR(11) 		NOT NULL,
    cnpj 				VARCHAR(14),
    nomeCompleto 		VARCHAR(110) 	NOT NULL,
    email 				VARCHAR(110) 	NOT NULL,
    senha 				VARCHAR(16) 	NOT NULL,
    username 			VARCHAR(45)		NOT NULL
);

CREATE TABLE Motorista (
    idMotorista 		INT 			AUTO_INCREMENT,
    nomeCompleto 		VARCHAR(45) 	NOT NULL,
    cpf 				CHAR(11) 		NOT NULL,
    telefoneCelular 	CHAR(11) 		NOT NULL,
    email 				VARCHAR(110)	NOT NULL,
    tipoCNH 			CHAR(1) 		NOT NULL,
    validadeCNH			DATE 			NOT NULL,
    status 				VARCHAR(45) 	NOT NULL,
    CEP 				CHAR(8) 		NOT NULL,
    fkUsuario			INT 			NOT NULL,
    PRIMARY KEY (idMotorista , fkUsuario),
    FOREIGN KEY (fkUsuario)
        REFERENCES Usuario (idUsuario)
);

CREATE TABLE Caminhao (
    idCaminhao 			INT				 PRIMARY KEY AUTO_INCREMENT,
    modelo 				VARCHAR(45)		NOT NULL,
    PBT 				INT				NOT NULL,
    categoria 			VARCHAR(45) 	NOT NULL,
    quilometragem		INT 			NOT NULL,
    kmManutencao 		INT 			NOT NULL,
    kmLitro 			DECIMAL(3 , 1 ) NOT NULL
);

CREATE TABLE Manutencao (
    idManutencao 		INT 			AUTO_INCREMENT,
    dataManutencao 		DATE NOT NULL,
    descricao 			TEXT NOT NULL,
    valor 				DECIMAL(8 , 2 ) NOT NULL,
    fkCaminhao 			INT 			NOT NULL,
    PRIMARY KEY (idManutencao , fkCaminhao),
    FOREIGN KEY (fkCaminhao)
        REFERENCES Caminhao (idCaminhao)
);

CREATE TABLE Frete (
    idFrete 			INT 			AUTO_INCREMENT,
    dtSaida 			DATE 			NOT NULL,
    dtChegada 			DATE 			NOT NULL,
    dtCriacao 			DATE 			NOT NULL,
    valor 				DECIMAL(10 , 2 ) NOT NULL,
    pesoKG 				INT 			NOT NULL,
    vlPedagio 			DECIMAL(5 , 2 ) NOT NULL,
    diariaAjudante 		DECIMAL(5 , 2 ),
    qtdAjudante 		INT,
    fkMotorista 		INT 			NOT NULL,
    fkCaminhao 			INT 			NOT NULL,
    PRIMARY KEY (idFrete , fkMotorista , fkCaminhao),
    FOREIGN KEY (fkMotorista)
        REFERENCES Motorista (idMotorista),
    FOREIGN KEY (fkCaminhao)
        REFERENCES Caminhao (idCaminhao)
);

CREATE TABLE Coleta (
    idColeta			INT 			AUTO_INCREMENT,
    CEP 				CHAR(8) 		NOT NULL,
    numero 				VARCHAR(5)		NOT NULL,
    cliente				VARCHAR(110)	NOT NULL,
    complemento 		VARCHAR(45),
    distanciaKM 		INT 			NOT NULL,
    fkFrete 			INT 			NOT NULL,
    PRIMARY KEY (idColeta , fkFrete),
    FOREIGN KEY (fkFrete)
        REFERENCES Frete (idFrete)
);

CREATE TABLE Entrega (
    idEntrega 			INT 			AUTO_INCREMENT,
    CEP 				CHAR(8) 		NOT NULL,
    numero 				VARCHAR(5) 		NOT NULL,
    complemento 		VARCHAR(45),
    destinatario 		VARCHAR(110)	NOT NULL,
    distanciaKM 		INT 			NOT NULL,
    fkFrete 			INT				NOT NULL,
    PRIMARY KEY (idEntrega , fkFrete),
    FOREIGN KEY (fkFrete)
        REFERENCES Frete (idFrete)
);

INSERT INTO Usuario (cpf, cnpj, nomeCompleto, email, senha, username)
VALUES
('11111111111', NULL, 'UsuárioTeste1', 'teste1@gmail.com', '123456', 'teste1'),
('22222222222', NULL, 'UsuárioTeste2', 'teste2@gmail.com', '123456', 'teste2'),
('33333333333', NULL, 'UsuárioTeste3', 'teste3@gmail.com', '123456', 'teste3');

select * from usuario;
