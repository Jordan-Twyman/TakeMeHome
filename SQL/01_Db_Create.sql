USE [master]

IF db_id('TakeMeHome') IS NULl
  CREATE DATABASE [TakeMeHome]
GO

USE [TakeMeHome]
GO



CREATE TABLE [Areas] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Inventory] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [AreaId] integer NOT NULL
)
GO

CREATE TABLE [HomeInventory] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [HomeId] integer NOT NULL, 
  [InventoryId] integer NOT NULL,
  [Brand] nvarchar(255),
  [ModelNumber] nvarchar(255)
)
GO

CREATE TABLE [Upkeep] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [InventoryId] integer NOT NULL,
  [Title] nvarchar(255) NOT NULL,
  [NumberOfMonths] integer NOT NULL,
  [Description] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Home] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [Password] nvarchar(255) NOT NULL,
  [ConstructedDate] datetime
)
GO

CREATE TABLE [HomeUpkeep] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [UpkeepId] integer NOT NULL,
  [HomeId] integer NOT NULL,
  [ScheduleDate] datetime,
  [Cost] int,
  [Count] integer
)
GO

ALTER TABLE [HomeInventory] ADD FOREIGN KEY ([InventoryId]) REFERENCES [Inventory] ([Id])
GO

ALTER TABLE [HomeInventory] ADD FOREIGN KEY ([HomeId]) REFERENCES [Home] ([Id])
GO

ALTER TABLE [HomeUpkeep] ADD FOREIGN KEY ([HomeId]) REFERENCES [Home] ([Id])
GO

ALTER TABLE [HomeUpkeep] ADD FOREIGN KEY ([UpkeepId]) REFERENCES [Upkeep] ([Id])
GO

ALTER TABLE [Upkeep] ADD FOREIGN KEY ([InventoryId]) REFERENCES [Inventory] ([Id])
GO

ALTER TABLE [Inventory] ADD FOREIGN KEY ([AreaId]) REFERENCES [Areas] ([Id])
GO
