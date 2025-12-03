DROP DATABASE IF EXISTS penguin;
CREATE DATABASE IF NOT EXISTS penguin;
USE penguin;

DROP TABLE IF EXISTS Usuario;

CREATE TABLE Usuario (
idUsuario INT NOT NULL AUTO_INCREMENT,
cpf CHAR(11) NOT NULL UNIQUE,
cnpj VARCHAR(14) UNIQUE,
nomeCompleto VARCHAR(110) NOT NULL,
email VARCHAR(110) NOT NULL UNIQUE,
senha VARCHAR(16) NOT NULL,
tipoCNH CHAR(1),
validadeCNH DATE,
telefoneCelular CHAR(11) UNIQUE,
status VARCHAR(45),
PRIMARY KEY (idUsuario)
);

INSERT INTO Usuario VALUES
(1,'11111111111',NULL,'Fontes','teste1@email.com','123456',NULL,NULL,NULL,NULL),
(2,'22222222222',NULL,'Usuário Teste 2','teste2@email.com','123456',NULL,NULL,NULL,NULL),
(3,'33333333333',NULL,'Usuário Teste 3','teste3@email.com','123456',NULL,NULL,NULL,NULL),
(4,'12345678901',NULL,'joao ferreira','joao.ferreira@gmail.com','senha123',NULL,NULL,NULL,NULL),
(5,'98765432100',NULL,'maria oliveira','maria.oliveira@gmail.com','abc12345',NULL,NULL,NULL,NULL),
(6,'45678912300','11222333000188','transporte silva ltda','contato@silvalog.com','silva2025',NULL,NULL,NULL,NULL);

DROP TABLE IF EXISTS Caminhao;
CREATE TABLE Caminhao (
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
REFERENCES Usuario (idUsuario)
);

INSERT INTO Caminhao VALUES
(1,1,'volvo fh 540',41000,'6x2 LS',150000,16000,2.8),
(2,2,'scania r440',30000,'6x2 Vanderléia',95000,100000,3.1),
(3,3,'mercedes actros 2651',45000,'6X2 LS',200000,210000,2.5);

DROP TABLE IF EXISTS Frete;
CREATE TABLE Frete (
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
PRIMARY KEY (idFrete),
KEY fkCaminhao (fkCaminhao),
KEY fkUsuario (fkUsuario),
CONSTRAINT FK_FRETE_CAMINHAO FOREIGN KEY (fkCaminhao) REFERENCES Caminhao (idCaminhao),
CONSTRAINT FK_FRETE_USUARIO FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario),
CONSTRAINT CHK_STATUS_FRETE CHECK (statusFrete in ('Realizado','Orçado','Marcado'))
);

INSERT INTO Frete VALUES
(default, 'Amazon Brasil','2025-12-04',2800.00,11500,155.60,1,1,1,'Marcado'),
(default,'Centauro','2025-12-05',1980.00,7600,90.30,1,1,1,'Marcado'),
(default,'Riachuelo','2025-12-06',2250.00,8400,104.75,2,1,1,'Marcado'),
(default,'Carrefour','2025-12-07',2500.00,9200,118.90,1,1,1,'Marcado'),
(default,'Ambev','2025-12-08',3100.00,14000,180.15,2,1,1,'Marcado'),
(default,'Boticário','2025-12-09',2150.00,8100,99.80,1,1,1,'Marcado'),
(default,'Coca-Cola FEMSA','2025-12-10',2950.00,12500,170.40,1,1,1,'Marcado'),
(default,'Via Varejo','2025-12-11',2400.00,9100,110.95,2,1,1,'Marcado'),
(default,'DHL Express','2025-06-12',2700.00,9800,115.30,1,1,1,'Realizado'),
(default,'FedEx Brasil','2025-07-18',2850.00,10500,128.40,2,1,1,'Realizado'),
(default,'Total Express','2025-08-22',2500.00,9200,102.90,1,1,1,'Realizado'),
(default,'Jamef Transportes','2025-09-14',2950.00,11000,140.10,1,1,1,'Realizado'),
(default,'Braspress','2025-10-09',3100.00,11800,150.75,2,1,1,'Realizado'),
(default,'Correios','2025-11-11',2600.00,8600,94.60,1,1,1,'Realizado');

DROP TABLE IF EXISTS Coleta;
CREATE TABLE Coleta (
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
REFERENCES Frete (idFrete)
);

INSERT INTO Coleta VALUES
(default,'05833000','95','Capão Redondo','SP','Riachuelo – Central de Transferência','Doca 1',29,7),
(default,'07055040','260','Vila Galvão','SP','Atacadão – Unidade Guarulhos','Setor de expedição',20,3),
(default,'80030000','410','Centro','PR','Coca-Cola FEMSA – Operações Curitiba','Depósito externo',34,2),
(default,'29102010','720','Vila Velha','ES','Porto de Vitória – Terminal Logístico','Área de cargas',27,4),
(default,'41301120','540','Fazendinha','PR','Boticário – Centro de Distribuição','Acesso lateral',13,5),
(default,'09781360','150','São Bernardo','SP','Volkswagen – Expedição de Peças','Galpão 5',32,6),
(default,'03308020','210','Tatuapé','SP','Carrefour – Armazém Frio','Câmara refrigerada',18,8),
(default,'04077000','380','Moema','SP','Ambev – Distribuição Zona Sul','Doca 2',12,9);

DROP TABLE IF EXISTS Motorista;
CREATE TABLE Motorista (
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
CONSTRAINT FK_MOTORISTA_USUARIO FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario)
);

INSERT INTO Motorista VALUES
(1,'carlos mendes','11122233344','11984561234','carlos.mendes@gmail.com','E','2027-08-15','ativo','09950000',1),
(2,'roberto dias','22233344455','11999998888','roberto.dias@gmail.com','D','2026-05-09','ativo','09940120',2),
(3,'fernando ramos','33344455566','11988887777','fernando.ramos@gmail.com','E','2028-02-11','inativo','09876543',3);


DROP TABLE IF EXISTS Despesa;
CREATE TABLE Despesa (
idDespesa int NOT NULL AUTO_INCREMENT,
descricao varchar(100) NOT NULL,
valor decimal(7,2) NOT NULL,
categoria varchar(45) NOT NULL,
dataDesp date DEFAULT NULL,
fkMotorista int NOT NULL,
PRIMARY KEY (idDespesa),
KEY FK_DESPESA_MOTORISTA (fkMotorista),
CONSTRAINT FK_DESPESA_MOTORISTA FOREIGN KEY (fkMotorista) REFERENCES Motorista (idMotorista),
CONSTRAINT CHECK_CATEGORIA CHECK (categoria in ('Alimentacao','Outro','Pedagio','Documentos', 'Combustivel', 'Manutencao'))
);

INSERT INTO Despesa VALUES
(default,'Café e pão de queijo no posto',12.00,'Alimentação','2025-12-02',1),
(default,'Troca de lâmpada do farol',28.50,'Manutenção','2025-12-03',1),
(default,'Pedágio - Rodovia Anhanguera',16.20,'Pedágio','2025-12-04',1),
(default,'Refrigerante e salgados',18.50,'Alimentação','2025-12-05',1),
(default,'Abastecimento - Diesel S10',680.00,'Combústivel','2025-12-06',1),
(default,'Calibragem completa dos pneus',10.00,'Manutenção','2025-12-06',1),
(default,'Lanche rápido (hambúrguer)',27.00,'Alimentação','2025-12-07',1),
(default,'Pedágio - Rodovia Imigrantes',31.20,'Pedágio','2025-12-08',1),
(default,'Troca de óleo + filtro',290.00,'Manutenção','2025-12-09',1),
(default,'Abastecimento - Diesel S10',845.00,'Combústivel','2025-12-10',1),
(default,'Almoço por kg no restaurante',42.30,'Alimentação','2025-12-11',1),
(default,'Pedágio - Rodoanel Mário Covas',22.30,'Pedágio','2025-12-12',1),
(default,'Lava rápido – lavagem completa',45.00,'Outro','2025-12-13',1),
(default,'Abastecimento extra - Diesel S10',402.00,'Combústivel','2025-12-14',1),
(default,'Compra de água e energético',17.40,'Alimentação','2025-12-15',1);


DROP TABLE IF EXISTS Entrega;
CREATE TABLE Entrega (
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
CONSTRAINT FK_ENTREGA_FRETE FOREIGN KEY (fkFrete) REFERENCES Frete (idFrete)
);

INSERT INTO Entrega VALUES
(default,'04547000','25','Itaim Bibi','SP','Centro de Distribuição Carrefour','Doca 3','Carrefour Itaim',102,7),
(default,'22775001','60','Barra da Tijuca','RJ','Amazon RJ Fulfillment','Bloco 2','Amazon Barra',250,3),
(default,'89201030','15','Centro','SC','Porto de Joinville','Armazém 1','Porto de Joinville',180,5),
(default,'69900100','120','Rio Branco','AC','Correios AC','Setor A','Correios Rio Branco',420,4),
(default,'72010010','80','Taguatinga','DF','Atacadão Taguatinga','Depósito 2','Atacadão Taguatinga',210,6),
(default,'61939000','55','Maracanaú','CE','Mercado Livre Hub CE','Doca 7','Mercado Livre CE',320,9),
(default,'65020120','30','Centro','MA','Porto do Itaqui','Galpão 5','Porto Itaqui',350,2),
(default,'78048000','70','Coxipó','MT','Riachuelo MT CD','Setor 4','Riachuelo MT',410,8),
(default,'74000000','25','Goiânia','GO','Boticário GO CD','Área 1','Boticário Goiânia',190,1),
(default,'40020000','10','Comércio','BA','Salvador Logística','Depósito Central','Salvador Logística',310,10);


DROP TABLE IF EXISTS Manutencao;
CREATE TABLE Manutencao (
idManutencao int NOT NULL AUTO_INCREMENT,
dataManutencao date NOT NULL,
descricao text NOT NULL,
valor decimal(8,2) NOT NULL,
categoria varchar(45),
fkCaminhao int NOT NULL,
PRIMARY KEY (idManutencao),
KEY FK_MANUTENCAO_CAMINHAO (fkCaminhao),
CONSTRAINT FK_MANUTENCAO_CAMINHAO FOREIGN KEY (fkCaminhao) REFERENCES Caminhao (idCaminhao)
);

INSERT INTO Manutencao VALUES
(1,'2025-04-10','troca de oleo e filtros',850.00,NULL,1),
(2,'2025-05-20','revisao dos freios',1200.00,NULL,2),
(3,'2025-03-05','substituicao de pneus',4500.00,NULL,3);

CREATE VIEW VW_DADOS_BRUTOS_FATURAMENTO_SEMESTRE AS
SELECT
u.idUsuario AS ID_Usuario,
DATE_FORMAT(f.dtSaida, '%Y-%m') AS mes,
SUM(f.valor) AS faturamento
FROM Frete f
JOIN Usuario u ON u.idUsuario = f.fkUsuario
WHERE f.statusFrete = 'Realizado'
GROUP BY DATE_FORMAT(f.dtSaida, '%Y-%m'), u.idUsuario
ORDER BY mes;

SELECT *
FROM VW_DADOS_BRUTOS_FATURAMENTO_SEMESTRE
WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = 'teste1@email.com');

-- DROP VIEW VW_DADOS_BRUTOS_FATURAMENTO_SEMESTRE;

CREATE VIEW VW_GRAFICO_DONUT AS
SELECT
u.idUsuario AS ID_Usuario,
d.categoria AS categoria,
SUM(d.valor) AS total
FROM Despesa d
JOIN Motorista m ON d.fkMotorista = m.idMotorista
JOIN Usuario u ON u.idUsuario = m.fkUsuario
GROUP BY u.idUsuario, d.categoria;

SELECT *
FROM VW_GRAFICO_DONUT
WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = 'teste1@email.com');

-- DROP VIEW VW_GRAFICO_DONUT;

CREATE VIEW VW_KPI_KM_TOTAL AS
SELECT
f.fkUsuario AS FK_USUARIO,
(SUM(c.distanciaKM) + SUM(e.distanciaKM)) AS TOTAL_DE_KM
FROM Frete f
LEFT JOIN Coleta c ON c.fkFrete = f.idFrete
LEFT JOIN Entrega e ON e.fkFrete = f.idFrete
GROUP BY f.fkUsuario;

SELECT *
FROM VW_KPI_KM_TOTAL
WHERE FK_USUARIO = (SELECT idUsuario FROM Usuario WHERE email = 'teste1@email.com');

-- DROP VIEW VW_KPI_KM_TOTAL;

CREATE VIEW VW_KPI_TOTAL_FRETES_REALIZADOS AS
SELECT
f.idFrete AS idFrete,
u.idUsuario AS ID_Usuario,
f.cliente AS CLIENTE,
f.dtSaida AS DATA_CONCLUSAO,
(SELECT COUNT(*)
FROM Frete
WHERE fkUsuario = u.idUsuario AND statusFrete = 'Realizado') AS TOTAL_FRETES_REALIZADOS
FROM Frete f
JOIN Usuario u ON u.idUsuario = f.fkUsuario
WHERE f.statusFrete = 'Realizado'
ORDER BY f.dtSaida DESC;

SELECT TOTAL_FRETES_REALIZADOS
FROM VW_KPI_TOTAL_FRETES_REALIZADOS
WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = 'teste1@email.com');

-- DROP VIEW KM_KPI_TOTAL_FRETES_REALIZADOS;

CREATE VIEW VW_QUILOMETRAGEM_ATE_MANUTENCAO AS
SELECT
u.idUsuario AS ID_Usuario,
c.quilometragem AS QUILOMETRAGEM,
c.kmManutencao AS INTERVALO_KM_MANUTENCAO,
SUM(co.distanciaKM) AS SOMA_KM_COLETAS,
SUM(en.distanciaKM) AS SOMA_KM_ENTREGAS
FROM Usuario u
JOIN Caminhao c ON c.fkUsuario = u.idUsuario
JOIN Frete f ON f.fkCaminhao = c.idCaminhao
JOIN Coleta co ON co.fkFrete = f.idFrete
JOIN Entrega en ON en.fkFrete = f.idFrete
GROUP BY u.idUsuario;

SELECT *
FROM VW_QUILOMETRAGEM_ATE_MANUTENCAO
WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = 'teste1@email.com');


-- DROP VIEW VW_QUILOMETRAGEM_ATE_MANUTENCAO;

CREATE OR REPLACE VIEW VW_LUCRO_LIQUIDO AS
 SELECT
        (
            SELECT SUM(f.valor)
            FROM Frete f
            WHERE f.fkUsuario = u.idUsuario
            AND MONTH(f.dtSaida) = MONTH(CURDATE())
            AND YEAR(f.dtSaida) = YEAR(CURDATE())
        ) AS TOTAL_FRETES,
        (
            SELECT SUM(d.valor)
            FROM Despesa d
            JOIN Motorista m ON d.fkMotorista = m.idMotorista
            WHERE m.fkUsuario = u.idUsuario
            AND MONTH(d.dataDesp) = MONTH(CURDATE())
            AND YEAR(d.dataDesp) = YEAR(CURDATE())
        ) AS TOTAL_DESPESAS,
        u.idUsuario AS ID_Usuario
    FROM Usuario u;

SELECT *
FROM VW_LUCRO_LIQUIDO
WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = 'teste1@email.com');

CREATE OR REPLACE VIEW VW_AGENDA AS
SELECT
f.idFrete AS ID_FRETE,
f.fkUsuario AS ID_Usuario,
f.dtSaida AS DATA_SAIDA,
f.cliente AS NOME_CLIENTE,
e.bairro AS BAIRRO,
e.estado AS ESTADO
FROM Frete f
LEFT JOIN Entrega e ON e.fkFrete = f.idFrete
WHERE YEARWEEK(f.dtSaida, 1) = YEARWEEK(CURDATE(), 1)
AND f.statusFrete = 'Marcado';

-- DROP VIEW VW_LUCRO_LIQUIDO;


CREATE OR REPLACE VIEW VW_DESPESAS_MENSAIS AS
SELECT
    u.idUsuario AS ID_Usuario,
    d.idDespesa AS ID_DESPESA,
    d.categoria AS CATEGORIA,
    d.valor AS VALOR,
    DATE_FORMAT(d.dataDesp, '%d/%m/%Y') AS DATA_FORMATADA,
    d.dataDesp AS DATA,
    d.descricao AS DESCRICAO,
    MONTH(d.dataDesp) AS MES,
    YEAR(d.dataDesp) AS ANO
FROM Despesa d
JOIN Motorista m ON d.fkMotorista = m.idMotorista
JOIN Usuario u ON u.idUsuario = m.fkUsuario
ORDER BY d.dataDesp DESC;



SELECT *
FROM VW_DESPESAS_MENSAIS
WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = 'teste1@email.com');


CREATE VIEW VW_RESUMO_DESPESAS_MENSAIS AS
SELECT
    u.idUsuario AS ID_Usuario,
    SUM(d.valor) AS TOTAL_DESPESAS_MES,
    SUM(CASE WHEN d.categoria = 'Alimentação' THEN d.valor ELSE 0 END) AS TOTAL_ALIMENTACAO,
    SUM(CASE WHEN d.categoria = 'Pedágio' THEN d.valor ELSE 0 END) AS TOTAL_PEDAGIO,
    SUM(CASE WHEN d.categoria = 'Documentos' THEN d.valor ELSE 0 END) AS TOTAL_DOCUMENTOS,
    SUM(CASE WHEN d.categoria = 'Outro' THEN d.valor ELSE 0 END) AS TOTAL_OUTROS,
    MONTH(d.dataDesp) AS MES,
    YEAR(d.dataDesp) AS ANO
FROM Despesa d
JOIN Motorista m ON d.fkMotorista = m.idMotorista
JOIN Usuario u ON u.idUsuario = m.fkUsuario
WHERE MONTH(d.dataDesp) = MONTH(CURDATE())
AND YEAR(d.dataDesp) = YEAR(CURDATE())
GROUP BY
    u.idUsuario,
    MONTH(d.dataDesp),
    YEAR(d.dataDesp);

CREATE OR REPLACE VIEW VW_FRETES AS
SELECT
	f.idFrete 	AS ID_Fretes,
	f.cliente 	AS CLIENTE,
    f.valor 	AS VALOR,
    f.pesoKG  	AS PESO_KG,
    f.vlPedagio	AS VALOR_PEDAGIO,
    f.qtdAjudante AS QTD_AJUDANTE,
    f.statusFrete AS STATUS_FRETES,
    f.dtSaida AS DT_SAIDA,
    u.idUsuario  AS ID_Usuario,
    u.email
	FROM Frete f
    JOIN Usuario u
    ON u.idUsuario = f.fkUsuario;

SELECT *
FROM VW_FRETES
WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = 'teste1@email.com');

-- DROP VIEW VW_RESUMO_DESPESAS_MENSAIS;

SELECT *
FROM VW_RESUMO_DESPESAS_MENSAIS
WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = 'teste1@email.com');

-- DROP DATABASE Penguin;

CREATE OR REPLACE VIEW VW_CONSULTA_COLETAS AS
SELECT
	c.idColeta AS ID_COLETA,
    c.CEP AS CEP_COLETA,
    c.numero AS NUMERO_COLETA,
    c.bairro AS BAIRRO_COLETA,
    c.estado AS ESTADO_COLETA,
    c.cliente AS CLIENTE_COLETA,
    c.complemento AS COMPLEMENTO_COLETA,
    c.distanciaKM AS DISTANCIA_KM_COLETA,
    c.fkFrete AS FK_FRETE,
    u.idUsuario AS ID_USUARIO,
    f.idFrete AS ID_FRETE
    FROM Coleta c
    JOIN Frete f
    ON c.fkFrete = f.idFrete
    JOIN Usuario u
    ON u.idUsuario = f.fkUsuario;

SELECT
	CEP_COLETA,
	NUMERO_COLETA,
	BAIRRO_COLETA,
	ESTADO_COLETA,
	CLIENTE_COLETA,
	COMPLEMENTO_COLETA,
	DISTANCIA_KM_COLETA
 FROM VW_CONSULTA_COLETAS
WHERE ID_USUARIO = (SELECT idUsuario FROM Usuario WHERE email = 'teste1@email.com');


    CREATE OR REPLACE VIEW VW_AGENDA AS
    SELECT
    f.idFrete AS ID_FRETE,
    f.fkUsuario AS ID_Usuario,
    f.dtSaida AS DATA_SAIDA,
    f.cliente AS NOME_CLIENTE,
    e.bairro AS BAIRRO,
    e.estado AS ESTADO
    FROM Frete f
    LEFT JOIN Entrega e ON e.fkFrete = f.idFrete
    WHERE YEARWEEK(f.dtSaida, 1) = YEARWEEK(CURDATE(), 1)
    AND f.statusFrete = 'Marcado';
   SELECT *
        FROM VW_AGENDA
        WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = 'teste1@email.com');

SELECT * FROM Usuario;
