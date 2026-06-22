-- Instalar tabla de la app INH Control Predios en la base existente Inh_Inmobiliaria
-- Servidor SSMS: 168.197.69.84,3002
-- Ejecutar todo este script en SSMS (usuario con permiso en Inh_Inmobiliaria)

USE Inh_Inmobiliaria;
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
  PRINT 'Tabla dbo.DatosApp creada.';
END
ELSE
BEGIN
  PRINT 'La tabla dbo.DatosApp ya existe.';
END
GO

IF NOT EXISTS (SELECT 1 FROM dbo.DatosApp WHERE Id = 1)
BEGIN
  INSERT INTO dbo.DatosApp (Id, DatosJson)
  VALUES (1, N'{}');
  PRINT 'Fila inicial insertada (JSON vacío; la API cargará usuarios al iniciar).';
END
GO

SELECT
  DB_NAME() AS BaseDatos,
  Id,
  ActualizadoEn,
  LEN(DatosJson) AS TamanoJson
FROM dbo.DatosApp
WHERE Id = 1;
GO
