CREATE DATABASE IF NOT EXISTS penguin;
USE penguin;

DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario (
    idUsuario INT NOT NULL AUTO_INCREMENT,  
    cpf CHAR(11) NOT NULL,
    cnpj VARCHAR(14),
    nomeCompleto VARCHAR(110) NOT NULL,
    email VARCHAR(110) NOT NULL,
    senha VARCHAR(16) NOT NULL,
    tipoCNH CHAR(1),
    validadeCNH DATE,
    telefoneCelular CHAR(11),
    status VARCHAR(45),
    PRIMARY KEY (idUsuario)
);
INSERT INTO usuario VALUES
(1,'11111111111',NULL,'Usuário Teste 1','teste1@email.com','123456',NULL,NULL,NULL,NULL),
(2,'22222222222',NULL,'Usuário Teste 2','teste2@email.com','123456',NULL,NULL,NULL,NULL),
(3,'33333333333',NULL,'Usuário Teste 3','teste3@email.com','123456',NULL,NULL,NULL,NULL),
(4,'12345678901',NULL,'joao ferreira','joao.ferreira@gmail.com','senha123',NULL,NULL,NULL,NULL),
(5,'98765432100',NULL,'maria oliveira','maria.oliveira@gmail.com','abc12345',NULL,NULL,NULL,NULL),
(6,'45678912300','11222333000188','transporte silva ltda','contato@silvalog.com','silva2025',NULL,NULL,NULL,NULL);


DROP TABLE IF EXISTS caminhao;
CREATE TABLE caminhao (
    idCaminhao INT NOT NULL AUTO_INCREMENT,
    fkUsuario INT NOT NULL,
    modelo VARCHAR(45) NOT NULL,
    PBT INT NOT NULL,
    categoria VARCHAR(45) NOT NULL,
    quilometragem INT NOT NULL,
    kmManutencao INT NOT NULL,
    kmLitro DECIMAL(3 , 1 ) NOT NULL,
    PRIMARY KEY (idCaminhao),
    UNIQUE KEY fkUsuario (fkUsuario),
    CONSTRAINT FK_CAMINHAO_USUARIO FOREIGN KEY (fkUsuario)
        REFERENCES usuario (idUsuario)
);

INSERT INTO caminhao VALUES
(1,1,'volvo fh 540',41000,'6x2 LS',150000,160000,2.8),
(2,2,'scania r440',30000,'6x2 Vanderléia',95000,100000,3.1),
(3,3,'mercedes actros 2651',45000,'6X2 LS',200000,210000,2.5);

DROP TABLE IF EXISTS frete;
CREATE TABLE frete (
  idFrete int NOT NULL AUTO_INCREMENT,
  cliente varchar(110) NOT NULL,
  dtSaida date NOT NULL,
  valor decimal(10,2) NOT NULL,
  pesoKG int NOT NULL,
  vlPedagio decimal(5,2) NOT NULL,
  qtdAjudante int,
  fkCaminhao int NOT NULL,
  fkUsuario int NOT NULL,
  statusFrete varchar(45),
  dtConclusao timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (idFrete),
  KEY fkCaminhao (fkCaminhao),
  KEY fkUsuario (fkUsuario),
  CONSTRAINT frete_ibfk_1 FOREIGN KEY (fkCaminhao) REFERENCES caminhao (idCaminhao),
  CONSTRAINT frete_ibfk_2 FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario),
  CONSTRAINT CHK_STATUS_FRETE CHECK (statusFrete in ('Realizado','Orçado','Marcado'))
);

INSERT INTO frete VALUES
(1,'CLIENTE A','2025-05-10',1800.00,9000,110.50,1,1,1,'Realizado','2025-05-12 03:00:00'),
(2,'CLIENTE B','2025-06-14',2100.00,9500,120.00,1,1,1,'Realizado','2025-06-16 03:00:00'),
(3,'CLIENTE C','2025-07-03',1950.00,8700,98.90,2,1,1,'Realizado','2025-07-05 03:00:00'),
(4,'CLIENTE D','2025-08-22',2400.00,11000,150.10,1,1,1,'Realizado','2025-08-24 03:00:00'),
(5,'CLIENTE E','2025-09-11',1750.00,7600,85.70,1,1,1,'Realizado','2025-09-13 03:00:00'),
(6,'CLIENTE F','2025-10-05',2600.00,12000,160.40,2,1,1,'Realizado','2025-10-07 03:00:00'),
(7,'Super Logística','2025-11-11',2200.00,8500,90.50,1,1,1,'Marcado','2025-11-17 03:43:04');
INSERT INTO frete (idFrete, cliente, dtSaida, valor, pesoKG, vlPedagio, qtdAjudante, fkCaminhao, fkUsuario, statusFrete)
VALUES
(8,'Log Brasil','2025-11-18',2100.00,8200,88.50,1,1,1,'Marcado'),
(9,'TransMoraes','2025-11-19',2500.00,9100,95.20,1,1,1,'Marcado'),
(10,'Mega Cargas','2025-11-21',2300.00,8700,92.10,2,1,1,'Marcado');

DROP TABLE IF EXISTS coleta;
CREATE TABLE coleta (
    idColeta INT NOT NULL AUTO_INCREMENT,
    CEP CHAR(8) NOT NULL,
    numero VARCHAR(5) NOT NULL,
    bairro VARCHAR(45) NOT NULL,
    estado VARCHAR(45) NOT NULL,
    cliente VARCHAR(110) NOT NULL,
    complemento VARCHAR(45),
    distanciaKM INT NOT NULL,
    fkFrete INT NOT NULL,
    PRIMARY KEY (idColeta),
    KEY FK_COLETA_FRETE (fkFrete),
    CONSTRAINT FK_COLETA_FRETE FOREIGN KEY (fkFrete)
        REFERENCES frete (idFrete)
);

INSERT INTO coleta VALUES
(1,'01010000','120','Centro','SP','Super Logística - Origem','Galpão 1',18,7),
(2,'01001000','250','Sé','SP','armazem santos log','galpao b',15,1),
(3,'02233000','580','Tucuruvi','SP','metalurgica vitoria',NULL,22,2),
(4,'04045000','102','Vila Mariana','SP','cooperativa alfa','entrada 2',30,3),
(5,'83260000','90','Araucária','PR','refinaria parana',NULL,18,4),
(6,'29175600','410','Serra','ES','depósito vitória carga','setor 3',27,5),
(7,'09980000','700','Diadema','SP','centro logistico abc',NULL,33,6),
(8, '04023000','500','Vila Mariana','SP','Mega Cargas - Origem','Doca 4',20,10),
(9, '02022000','200','Santana','SP','TransMoraes - Origem','Galpão 2',18,9),
(10, '01002000','150','Sé','SP','Log Brasil - Origem',NULL,12,8);

DROP TABLE IF EXISTS motorista;
CREATE TABLE motorista (
  idMotorista int NOT NULL AUTO_INCREMENT,
  nomeCompleto varchar(110) NOT NULL,
  cpf char(11) NOT NULL,
  telefoneCelular char(11),
  email varchar(110) NOT NULL,
  tipoCNH char(1),
  validadeCNH date,
  status varchar(45),
  CEP char(8),
  fkUsuario int NOT NULL,
  PRIMARY KEY (idMotorista),
  KEY FK_MOTORISTA_USUARIO (fkUsuario),
  CONSTRAINT FK_MOTORISTA_USUARIO FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario)
);

INSERT INTO motorista VALUES
(1,'carlos mendes','11122233344','11984561234','carlos.mendes@gmail.com','E','2027-08-15','ativo','09950000',1),
(2,'roberto dias','22233344455','11999998888','roberto.dias@gmail.com','D','2026-05-09','ativo','09940120',2),
(3,'fernando ramos','33344455566','11988887777','fernando.ramos@gmail.com','E','2028-02-11','inativo','09876543',3);


DROP TABLE IF EXISTS despesa;
CREATE TABLE despesa (
  idDespesa int NOT NULL AUTO_INCREMENT,
  descricao varchar(100) NOT NULL,
  valor decimal(7,2) NOT NULL,
  categoria varchar(45) NOT NULL,
  dataDesp date DEFAULT NULL,
  fkMotorista int NOT NULL,
  PRIMARY KEY (idDespesa),
  KEY FK_DESPESA_MOTORISTA (fkMotorista),
  CONSTRAINT FK_DESPESA_MOTORISTA FOREIGN KEY (fkMotorista) REFERENCES motorista (idMotorista),
  CONSTRAINT CHECK_CATEGORIA CHECK (categoria in ('Alimentação','Outro','Pedágio','Documentos'))
);

INSERT INTO despesa VALUES
(1,'Almoço no posto',32.50,'Alimentação','2025-01-12',1),
(2,'Jantar na estrada',45.00,'Alimentação','2025-01-14',1),
(3,'Pedágio - Bandeirantes',18.90,'Pedágio','2025-01-15',1),
(4,'Documentos do veículo',120.00,'Documentos','2025-01-20',1),
(5,'Lavagem do caminhão',35.00,'Outro','2025-01-21',1);

DROP TABLE IF EXISTS entrega;
CREATE TABLE entrega (
  idEntrega int NOT NULL AUTO_INCREMENT,
  CEP char(8) NOT NULL,
  numero varchar(5) NOT NULL,
  bairro varchar(45) NOT NULL,
  estado varchar(45) NOT NULL,
  cliente varchar(110) NOT NULL,
  complemento varchar(45),
  destinatario varchar(110) NOT NULL,
  distanciaKM int NOT NULL,
  fkFrete int NOT NULL,
  PRIMARY KEY (idEntrega),
  KEY FK_ENTREGA_FRETE (fkFrete),
  CONSTRAINT FK_ENTREGA_FRETE FOREIGN KEY (fkFrete) REFERENCES frete (idFrete)
);

INSERT INTO entrega VALUES
(1,'18020000','55','Centro','SP','Centro Distribuição SP','Depósito Oeste','Centro Distribuição SP',140,7),
(2,'18013110','42','Sorocaba','SP','centro distribuidor sorocaba',NULL,'centro distribuidor sorocaba',120,1),
(3,'13050420','300','Campinas','SP','autopecas campinas','bloco 1','autopecas campinas',180,2),
(4,'05025030','12','Pinheiros','SP','supermercado pinheiros',NULL,'supermercado pinheiros',94,3),
(5,'20040002','90','Centro','RJ','rio cargas centro',NULL,'rio cargas centro',210,4),
(6,'30140071','999','Savassi','MG','bh distribuidora','galpao 4','bh distribuidora',165,5),
(7,'72820040','40','Águas Lindas','GO','cidade do entorno cargas',NULL,'cidade do entorno cargas',140,6),
(8, '18040000','80','Centro','SP','Log Brasil','Bloco A','Log Brasil Destino',95,8),
(9, '18133000','33','Sorocaba','SP','TransMoraes','Setor 1','TransMoraes Destino',140,9),
(10, '13090000','70','Campinas','SP','Mega Cargas',NULL,'Mega Cargas Destino',160,10);





DROP TABLE IF EXISTS manutencao;
CREATE TABLE manutencao (
  idManutencao int NOT NULL AUTO_INCREMENT,
  dataManutencao date NOT NULL,
  descricao text NOT NULL,
  valor decimal(8,2) NOT NULL,
  categoria varchar(45),
  fkCaminhao int NOT NULL,
  PRIMARY KEY (idManutencao),
  KEY FK_MANUTENCAO_CAMINHAO (fkCaminhao),
  CONSTRAINT FK_MANUTENCAO_CAMINHAO FOREIGN KEY (fkCaminhao) REFERENCES caminhao (idCaminhao)
);

INSERT INTO manutencao VALUES
(1,'2025-04-10','troca de oleo e filtros',850.00,NULL,1),
(2,'2025-05-20','revisao dos freios',1200.00,NULL,2),
(3,'2025-03-05','substituicao de pneus',4500.00,NULL,3);



-- vw_dados_brutos_faturamento_semestre
CREATE VIEW  VW_DADOS_BRUTOS_FATURAMENTO_SEMESTRE AS
SELECT
    u.idUsuario AS ID_Usuario,
    DATE_FORMAT(f.dtConclusao, '%Y-%m') AS mes,
    SUM(f.valor) AS faturamento
FROM frete f
JOIN usuario u ON u.idUsuario = f.fkUsuario
WHERE f.statusFrete = 'Realizado'
GROUP BY DATE_FORMAT(f.dtConclusao, '%Y-%m'), u.idUsuario
ORDER BY mes;

 SELECT *
        FROM VW_DADOS_BRUTOS_FATURAMENTO_SEMESTRE
        WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = 'teste1@email.com');

-- DROP VIEW VW_DADOS_BRUTOS_FATURAMENTO_SEMESTRE;

-- vw_grafico_donut
CREATE VIEW VW_GRAFICO_DONUT AS
SELECT
    u.idUsuario AS ID_Usuario,
    d.categoria AS categoria,
    SUM(d.valor) AS total
FROM despesa d
JOIN motorista m ON d.fkMotorista = m.idMotorista
JOIN usuario u ON u.idUsuario = m.fkUsuario
GROUP BY u.idUsuario, d.categoria;

  SELECT *
	FROM VW_GRAFICO_DONUT
        WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = 'teste1@email.com');

-- DROP VIEW VW_GRAFICO_DONUT;

-- vw_kpi_km_total
CREATE VIEW VW_KPI_KM_TOTAL AS
SELECT
    f.fkUsuario AS FK_USUARIO,
    (SUM(c.distanciaKM) + SUM(e.distanciaKM)) AS TOTAL_DE_KM
FROM frete f
LEFT JOIN coleta c ON c.fkFrete = f.idFrete
LEFT JOIN entrega e ON e.fkFrete = f.idFrete
GROUP BY f.fkUsuario;

 SELECT *
        FROM VW_KPI_KM_TOTAL
        WHERE FK_USUARIO = (SELECT idUsuario FROM Usuario WHERE email = 'teste1@email.com');

-- DROP VIEW VW_KPI_KM_TOTAL;

-- vw_kpi_total_fretes_realizados
CREATE VIEW  VW_KPI_TOTAL_FRETES_REALIZADOS AS
SELECT
    f.idFrete AS idFrete,
    u.idUsuario AS ID_Usuario,
    f.cliente AS CLIENTE,
    f.dtConclusao AS DATA_CONCLUSAO,
    (SELECT COUNT(*)
     FROM frete
     WHERE fkUsuario = u.idUsuario AND statusFrete = 'Realizado') AS TOTAL_FRETES_REALIZADOS
FROM frete f
JOIN usuario u ON u.idUsuario = f.fkUsuario
WHERE f.statusFrete = 'Realizado'
ORDER BY f.dtConclusao DESC;

SELECT TOTAL_FRETES_REALIZADOS
            FROM VW_KPI_TOTAL_FRETES_REALIZADOS
            WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = 'teste1@email.com');

-- DROP VIEW KM_KPI_TOTAL_FRETES_REALIZADOS;

-- vw_quilometragem_ate_manutencao
CREATE VIEW  VW_QUILOMETRAGEM_ATE_MANUTENCAO AS
SELECT
    u.idUsuario AS ID_Usuario,
    c.quilometragem AS QUILOMETRAGEM,
    c.kmManutencao AS INTERVALO_KM_MANUTENCAO,
    SUM(co.distanciaKM) AS SOMA_KM_COLETAS,
    SUM(en.distanciaKM) AS SOMA_KM_ENTREGAS
FROM usuario u
JOIN caminhao c ON c.fkUsuario = u.idUsuario
JOIN frete f ON f.fkCaminhao = c.idCaminhao
JOIN coleta co ON co.fkFrete = f.idFrete
JOIN entrega en ON en.fkFrete = f.idFrete
GROUP BY u.idUsuario;

SELECT *
	FROM VW_QUILOMETRAGEM_ATE_MANUTENCAO
	WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = 'teste1@email.com');


 -- DROP VIEW VW_QUILOMETRAGEM_ATE_MANUTENCAO;

-- VW_LUCRO_LIQUIDO

CREATE VIEW VW_LUCRO_LIQUIDO AS
 SELECT
    (
        SELECT SUM(f.valor)
        FROM Frete f
        WHERE f.fkUsuario = u.idUsuario
    ) AS TOTAL_FRETES,
    (
        SELECT SUM(d.valor)
        FROM Despesa d
        JOIN Motorista m ON d.fkMotorista = m.idMotorista
        WHERE m.fkUsuario = u.idUsuario
    ) AS TOTAL_DESPESAS,
    u.idUsuario AS ID_Usuario
        FROM Usuario u;

SELECT *
            FROM VW_LUCRO_LIQUIDO
            WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = 'teste1@email.com');

-- VIEW AGENDA
CREATE OR REPLACE VIEW VW_AGENDA AS
SELECT
    f.idFrete AS ID_FRETE,
    f.fkUsuario AS ID_Usuario,
    f.dtSaida AS DATA_SAIDA,
    f.cliente AS NOME_CLIENTE,
    e.bairro AS BAIRRO,
    e.estado AS ESTADO
FROM frete f
LEFT JOIN entrega e ON e.fkFrete = f.idFrete
WHERE YEARWEEK(f.dtSaida, 1) = YEARWEEK(CURDATE(), 1)
  AND f.statusFrete = 'Marcado';

-- DROP VIEW VW_LUCRO_LIQUIDO;

 -- DROP DATABASE Penguin;
