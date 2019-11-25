CREATE DATABASE [FavoriteCities];
USE [FavoriteCities];
CREATE TABLE [dbo].[Cities] (
    [Name]  NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED ([Name] ASC)
);
INSERT INTO [dbo].[Cities] VALUES ('Moscow');
INSERT INTO [dbo].[Cities] VALUES ('Kiyv');