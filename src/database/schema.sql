CREATE DATABASE banco;

\c banco;

CREATE TABLE contas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(12) NOT NULL
);

INSERT INTO contas (nome, email, senha) VALUES
('Harry Styles', 'harry.styles@email.com', 'senha123'),
('Liam Payne', 'liam.payne@email.com', 'senha123'),
('Louis Tomlinson', 'louis.tomlinson@email.com', 'senha123'),
('Niall Horan', 'niall.horan@email.com', 'senha123'),
('Zayn Malik', 'zayn.malik@email.com', 'senha123');

CREATE TABLE pagamentos (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    data DATE,
    valor DECIMAL(10, 2),
    conta_id INTEGER REFERENCES contas(id) ON DELETE SET NULL
);

INSERT INTO pagamentos (descricao, data, valor, conta_id) VALUES
('Pagamento de aluguel', '2025-05-01', 1200.50, 1),
('Compra no supermercado', '2025-05-03', 350.75, 2),
('Mensalidade da academia', '2025-05-05', 150.00, 3),
('Pagamento de internet', '2025-05-06', 99.90, 4),
('Compra de eletrônicos', '2025-05-07', 2500.00, 5);