-- Ejecutar en SQL Server Management Studio (SSMS)
-- Crea la base y la tabla central de datos de la app INH Control Predios

IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE name = N'InhControlPredios')
BEGIN
  CREATE DATABASE InhControlPredios;
END
GO

USE InhControlPredios;
GO

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = N'DatosApp' AND schema_id = SCHEMA_ID(N'dbo'))
BEGIN
  CREATE TABLE dbo.DatosApp (
    Id INT NOT NULL CONSTRAINT PK_DatosApp PRIMARY KEY,
    DatosJson NVARCHAR(MAX) NOT NULL,
    ActualizadoEn DATETIME2 NOT NULL CONSTRAINT DF_DatosApp_ActualizadoEn DEFAULT SYSUTCDATETIME(),
    CONSTRAINT CK_DatosApp_SingleRow CHECK (Id = 1),
    CONSTRAINT CK_DatosApp_Json CHECK (ISJSON(DatosJson) = 1)
  );
END
GO

IF NOT EXISTS (SELECT 1 FROM dbo.DatosApp WHERE Id = 1)
BEGIN
  INSERT INTO dbo.DatosApp (Id, DatosJson)
  VALUES (1, N'{}');
END
GO

-- Usuarios iniciales (se completan al iniciar la API si el JSON está vacío)
SELECT Id, ActualizadoEn, LEN(DatosJson) AS TamanoJson
FROM dbo.DatosApp
WHERE Id = 1;
GO
