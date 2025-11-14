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
    senha 				VARCHAR(16) 	NOT NULL
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
    CONSTRAINT FK_MOTORISTA_USUARIO
		FOREIGN KEY (fkUsuario)
			REFERENCES Usuario (idUsuario)
);

CREATE TABLE Despesa(
	idDespesa 			INT 			PRIMARY KEY AUTO_INCREMENT,
    descricao			VARCHAR(100)	NOT NULL,
    valor				VARCHAR(100)	NOT NULL,
    categoria			VARCHAR(45)		NOT NULL,
    dataDesp			DATE,
    fkMotorista			INT,
    CONSTRAINT CHECK_CATEGORIA	CHECK(categoria IN('Alimentação', 'Outro', 'Pedágio', 'Documentos')),
    CONSTRAINT FK_DESPESA_MOTORISTA
		FOREIGN KEY(fkMotorista)
			REFERENCES Motorista(idMotorista)
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
    categoria			VARCHAR(45),
    fkCaminhao 			INT 			NOT NULL,
    PRIMARY KEY (idManutencao , fkCaminhao),
    CONSTRAINT FK_MANUTENCAO_CAMINHAO
		FOREIGN KEY (fkCaminhao)
			REFERENCES Caminhao (idCaminhao)
);

CREATE TABLE Frete (
    idFrete 			INT 			AUTO_INCREMENT,
    cliente				VARCHAR(110) 	NOT NULL,
    dtSaida 			DATE 			NOT NULL,
    valor 				DECIMAL(10 , 2 ) NOT NULL,
    pesoKG 				INT 			NOT NULL,
    vlPedagio 			DECIMAL(5 , 2 ) NOT NULL,
    qtdAjudante 		INT,
    fkMotorista 		INT 			NOT NULL,
    fkCaminhao 			INT 			NOT NULL,
    fkUsuario 			INT				NOT NULL,
    statusFrete 		VARCHAR(45),
    dtConclusao			TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT CHK_STATUS_FRETE
		CHECK (statusFrete in('Realizado', 'Orçado', 'Marcado')),
    PRIMARY KEY (idFrete , fkMotorista , fkCaminhao),
    FOREIGN KEY (fkMotorista)
        REFERENCES Motorista (idMotorista),
    FOREIGN KEY (fkCaminhao)
        REFERENCES Caminhao (idCaminhao),
	FOREIGN KEY (fkUsuario)
		REFERENCES Usuario (idUsuario)
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
    CONSTRAINT FK_COLETA_FRETE
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
    CONSTRAINT FK_ENTREGA_FRETE
		FOREIGN KEY (fkFrete)
			REFERENCES Frete (idFrete)
);

INSERT INTO Usuario (cpf, cnpj, nomeCompleto, email, senha)
VALUES
('11111111111', NULL, 'Usuário Teste 1', 'teste1@email.com', '123456'),
('22222222222', NULL, 'Usuário Teste 2', 'teste2@email.com', '123456'),
('33333333333', NULL, 'Usuário Teste 3', 'teste3@email.com', '123456');

INSERT INTO Usuario (cpf, cnpj, nomeCompleto, email, senha) VALUES
('12345678901', NULL, 'joao ferreira', 'joao.ferreira@gmail.com', 'senha123'),
('98765432100', NULL, 'maria oliveira', 'maria.oliveira@gmail.com', 'abc12345'),
('45678912300', '11222333000188', 'transporte silva ltda', 'contato@silvalog.com', 'silva2025');

INSERT INTO Motorista (nomeCompleto, cpf, telefoneCelular, email, tipoCNH, validadeCNH, status, CEP, fkUsuario) VALUES
('carlos mendes', '11122233344', '11984561234', 'carlos.mendes@gmail.com', 'E', '2027-08-15', 'ativo', '09950000', 1),
('roberto dias', '22233344455', '11999998888', 'roberto.dias@gmail.com', 'D', '2026-05-09', 'ativo', '09940120', 2),
('fernando ramos', '33344455566', '11988887777', 'fernando.ramos@gmail.com', 'E', '2028-02-11', 'inativo', '09876543', 3);

INSERT INTO Caminhao (modelo, PBT, categoria, quilometragem, kmManutencao, kmLitro) VALUES
('volvo fh 540', 41000, '6x2 LS', 150000, 160000, 2.8),
('scania r440', 30000, '6x2 Vanderléia', 95000, 100000, 3.1),
('mercedes actros 2651', 45000, '6X2 LS', 200000, 210000, 2.5);

INSERT INTO Manutencao (dataManutencao, descricao, valor, fkCaminhao) VALUES
('2025-04-10', 'troca de oleo e filtros', 850.00, 1),
('2025-05-20', 'revisao dos freios', 1200.00, 2),
('2025-03-05', 'substituicao de pneus', 4500.00, 3);

INSERT INTO Frete
(cliente, dtSaida, valor, pesoKG, vlPedagio, qtdAjudante, fkMotorista, fkCaminhao, fkUsuario, statusFrete, dtConclusao)
VALUES
('MONTONE','2025-11-03', 1500.00, 8000, 120.50, 1, 1, 1, 1, 'Realizado', '2025-11-05'),
('ANIDROL','2025-11-08', 1800.00, 9500, 130.75, 2, 2, 2, 1, 'Orçado', '2025-11-10'),
('ANIDROL','2025-11-11', 2100.00, 10000, 140.00, 1, 3, 3, 1, 'Realizado', '2025-11-13');

INSERT INTO Coleta (CEP, numero, cliente, complemento, distanciaKM, fkFrete) VALUES
('01001000', '250', 'armazem santos log', 'galpao b', 15, 1),
('02233000', '580', 'metalurgica vitoria', NULL, 22, 2),
('04045000', '102', 'cooperativa alfa', 'entrada 2', 30, 3);

INSERT INTO Entrega (CEP, numero, complemento, destinatario, distanciaKM, fkFrete) VALUES
('18013110', '42', NULL, 'centro distribuidor sorocaba', 120, 1),
('13050420', '300', 'bloco 1', 'autopecas campinas', 180, 2),
('05025030', '12', NULL, 'supermercado pinheiros', 95, 3);

select * from usuario;

SELECT
  f.idFrete,
  u.idUsuario AS ID_Usuario,
  f.cliente as CLIENTE,
  f.dtConclusao AS DATA_CONCLUSAO,
  (SELECT COUNT(*)
   FROM Frete
   WHERE fkUsuario = u.idUsuario
     AND statusFrete = 'Realizado') AS TOTAL_FRETES_REALIZADOS
FROM Frete f
JOIN Usuario u ON u.idUsuario = f.fkUsuario
WHERE u.email = "teste1@email.com"
  AND f.statusFrete = 'Realizado'
ORDER BY f.dtConclusao DESC;

DROP VIEW IF EXISTS VW_KPI_FRETES_REALIZADOS_TOTAL;
-- VIEW precisa ser criada antes de consultar
CREATE VIEW VW_KPI_FRETES_REALIZADOS_TOTAL AS
SELECT fkUsuario, COUNT(*) AS QTD_FRETES
FROM Frete
WHERE statusFrete = 'Realizado'
GROUP BY fkUsuario;

SELECT QTD_FRETES FROM VW_KPI_FRETES_REALIZADOS_TOTAL;

CREATE VIEW VW_KPI_FRETES_REALIDADOS_SEMANA AS
SELECT COUNT(idFrete) FROM Frete;

DROP DATABASE Penguin;


