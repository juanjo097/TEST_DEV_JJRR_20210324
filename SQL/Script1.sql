IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'PruebaDev1')
	BEGIN
		CREATE DATABASE [PruebaDev1]
	END
    GO
USE [PruebaDev1]
GO


CREATE TABLE Tb_PersonasFisicas
(
    IdPersonaFisica INT IDENTITY,
    FechaRegistro DATETIME,
    FechaActualizacion DATETIME,
    Nombre VARCHAR(50),
    ApellidoPaterno VARCHAR(50),
    ApellidoMaterno VARCHAR(50),
    RFC VARCHAR(13),
    FechaNacimiento DATE,
    UsuarioAgrega INT,
    Activo BIT
);

ALTER TABLE Tb_PersonasFisicas
ADD CONSTRAINT [PK_Tb_PersonasFisicas]
    PRIMARY KEY (IdPersonaFisica);

ALTER TABLE Tb_PersonasFisicas
ADD CONSTRAINT [DF_Tb_PersonasFisicas_FechaRegistro]
    DEFAULT (GETDATE()) FOR FechaRegistro;

ALTER TABLE Tb_PersonasFisicas
ADD CONSTRAINT [DF_Tb_PersonasFisicas_Activo]
    DEFAULT (1) FOR Activo;
GO

CREATE PROCEDURE dbo.sp_EliminarPersonaFisica
(@IdPersonaFisica INT)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @ID INT,
            @ESTATUS VARCHAR(500);
    BEGIN TRY
        IF EXISTS
        (
            SELECT *
            FROM dbo.Tb_PersonasFisicas
            WHERE IdPersonaFisica = @IdPersonaFisica
                  AND Activo = 1
        )
		BEGIN
			UPDATE dbo.Tb_PersonasFisicas
			SET Activo = 0
			WHERE IdPersonaFisica = @IdPersonaFisica;
		END
		ELSE
			BEGIN
				SELECT @ESTATUS = 'La persona fisica no existe.';
				THROW 50000, @ERROR, 1;
		END;

        
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
        SELECT ERROR_NUMBER() * -1 AS ESTATUS,
               ISNULL(@ESTATUS, 'Error al actualizar el registro.') AS MENSAJE;
    END CATCH;
END;
GO


CREATE PROCEDURE dbo.sp_AgregarPersonaFisica
(
    @Nombre VARCHAR(50),
    @ApellidoPaterno VARCHAR(50),
    @ApellidoMaterno VARCHAR(50),
    @RFC VARCHAR(13),
    @FechaNacimiento DATE,
    @UsuarioAgrega INT
)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @ID INT,
            @ESTATUS VARCHAR(500);
    BEGIN TRY
        IF LEN(@RFC) != 13
        BEGIN
            SELECT @ESTATUS = 'El RFC no es válido';
            THROW 50000, @ESTATUS, 1;
        END;
        IF EXISTS
        (
            SELECT *
            FROM dbo.Tb_PersonasFisicas
            WHERE RFC = @RFC
                  AND Activo = 1
        )
        BEGIN
            SELECT @ESTATUS = 'El RFC ya existe en el sistema';
            THROW 50000, @ESTATUS, 1;
        END;

        INSERT INTO dbo.Tb_PersonasFisicas
        (
            FechaRegistro,
            FechaActualizacion,
            Nombre,
            ApellidoPaterno,
            ApellidoMaterno,
            RFC,
            FechaNacimiento,
            UsuarioAgrega,
            Activo
        )
        VALUES
        (   GETDATE(),        -- FechaRegistro - datetime
            NULL,             -- FechaActualizacion - datetime
            @Nombre,          -- Nombre - varchar(50)
            @ApellidoPaterno, -- ApellidoPaterno - varchar(50)
            @ApellidoMaterno, -- ApellidoMaterno - varchar(50)
            @RFC,             -- RFC - varchar(13)
            @FechaNacimiento, -- FechaNacimiento - date
            @UsuarioAgrega,   -- UsuarioAgrega - int
            1                 -- Activo - bit
            );

        SELECT @ID = SCOPE_IDENTITY();
        SELECT @ID AS ESTATUS,
               'Registro exitoso' AS MENSAJE;
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
        SELECT ERROR_NUMBER() * -1 AS ESTATUS,
               ISNULL(@ESTATUS, 'Error al guardar el registro.') AS MENSAJE;
    END CATCH;
END;
GO

CREATE PROCEDURE dbo.sp_ActualizarPersonaFisica
(
    @IdPersonaFisica INT,
    @Nombre VARCHAR(50),
    @ApellidoPaterno VARCHAR(50),
    @ApellidoMaterno VARCHAR(50),
    @RFC VARCHAR(13),
    @FechaNacimiento DATE,
    @UsuarioAgrega INT
)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @ID INT,
            @ESTATUS VARCHAR(500);
    BEGIN TRY
        IF EXISTS
        (
            SELECT *
            FROM dbo.Tb_PersonasFisicas
            WHERE IdPersonaFisica = @IdPersonaFisica
                  AND Activo = 1
        )
		BEGIN
			UPDATE dbo.Tb_PersonasFisicas
			SET Nombre = @Nombre,
				ApellidoPaterno = @ApellidoPaterno,
				ApellidoMaterno = @ApellidoMaterno,
				RFC = @RFC,
				FechaNacimiento = @FechaNacimiento
			WHERE IdPersonaFisica = @IdPersonaFisica;

			SELECT @IdPersonaFisica AS ESTATUS,
				   'Registro exitoso' AS MENSAJE;
		END;
		ELSE
			BEGIN
				SELECT @ESTATUS = 'La persona fisica no existe.';
				THROW 50000, @ESTATUS, 1;
			END;
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
        SELECT ERROR_NUMBER() * -1 AS ESTATUS,
               ISNULL(@ESTATUS, 'Error al actualizar el registro.') AS MENSAJE;
    END CATCH;
END;
GO