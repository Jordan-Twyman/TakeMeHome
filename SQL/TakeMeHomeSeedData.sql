INSERT INTO Area (Name) VALUES ('Kitchen')
INSERT INTO Area (Name) VALUES ('Systems')
INSERT INTO Area (Name) VALUES ('Utility')
INSERT INTO Area (Name) VALUES ('Exterior')
INSERT INTO Area (Name) VALUES ('Outdoor')
INSERT INTO Area (Name) VALUES ('Bathroom')
INSERT INTO Area (Name) VALUES ('Surfaces')



INSERT INTO Inventory (Name, AreaId) VALUES ('Refrigerator',  1)
INSERT INTO Inventory (Name, AreaId) VALUES ('Range',  1)
INSERT INTO Inventory (Name, AreaId) VALUES ('Dishwasher', 1)
INSERT INTO Inventory (Name, AreaId) VALUES ('Kitchen Sink', 1)
INSERT INTO Inventory (Name, AreaId) VALUES ('Kitchen Cabinets', 1)
INSERT INTO Inventory (Name, AreaId) VALUES ('Kitchen Countertops', 1)
INSERT INTO Inventory (Name, AreaId) VALUES ('Garbage Disposal', 1)
INSERT INTO Inventory (Name, AreaId) VALUES ('Wall Oven', 1)
INSERT INTO Inventory (Name, AreaId) VALUES ('Cooktop', 1)


INSERT INTO Inventory (Name, AreaId) VALUES ('Furnace', 2)
INSERT INTO Inventory (Name, AreaId) VALUES ('Boiler', 2)
INSERT INTO Inventory (Name, AreaId) VALUES ('Cieling Fan', 2)
INSERT INTO Inventory (Name, AreaId) VALUES ('Central AC', 2)
INSERT INTO Inventory (Name, AreaId) VALUES ('Electrical', 2)
INSERT INTO Inventory (Name, AreaId) VALUES ('Plumbing', 2)
INSERT INTO Inventory (Name, AreaId) VALUES ('Ventilation', 2)
INSERT INTO Inventory (Name, AreaId) VALUES ('Gas Fireplace', 2)
INSERT INTO Inventory (Name, AreaId) VALUES ('Wood-burning Fireplace', 2)
INSERT INTO Inventory (Name, AreaId) VALUES ('Smoke Detectors', 2)
INSERT INTO Inventory (Name, AreaId) VALUES ('CO Detectors', 2)
INSERT INTO Inventory (Name, AreaId) VALUES ('Home Security', 2)




INSERT INTO Inventory (Name, AreaId) VALUES ('Washer', 3)
INSERT INTO Inventory (Name, AreaId) VALUES ('Dryer', 3)
INSERT INTO Inventory (Name, AreaId) VALUES ('Water Heater', 3)
INSERT INTO Inventory (Name, AreaId) VALUES ('Water Filtration', 3)
INSERT INTO Inventory (Name, AreaId) VALUES ('Water Softener', 3)
INSERT INTO Inventory (Name, AreaId) VALUES ('Generator', 3)



INSERT INTO Inventory (Name, AreaId) VALUES ('Roof', 4)
INSERT INTO Inventory (Name, AreaId) VALUES ('Gutters', 4)
INSERT INTO Inventory (Name, AreaId) VALUES ('Foundation', 4)
INSERT INTO Inventory (Name, AreaId) VALUES ('Siding', 4)
INSERT INTO Inventory (Name, AreaId) VALUES ('Windows', 4)
INSERT INTO Inventory (Name, AreaId) VALUES ('Front Door', 4)
INSERT INTO Inventory (Name, AreaId) VALUES ('Back Door', 4)
INSERT INTO Inventory (Name, AreaId) VALUES ('Sliding Door', 4)
INSERT INTO Inventory (Name, AreaId) VALUES ('Garage Door', 4)



INSERT INTO Inventory (Name, AreaId) VALUES ('Driveway', 5)
INSERT INTO Inventory (Name, AreaId) VALUES ('Walkway', 5)
INSERT INTO Inventory (Name, AreaId) VALUES ('Lawn', 5)
INSERT INTO Inventory (Name, AreaId) VALUES ('Deck', 5)
INSERT INTO Inventory (Name, AreaId) VALUES ('Patio', 5)
INSERT INTO Inventory (Name, AreaId) VALUES ('Fence', 5)
INSERT INTO Inventory (Name, AreaId) VALUES ('Trees', 5)
INSERT INTO Inventory (Name, AreaId) VALUES ('Plants', 5)


INSERT INTO Inventory (Name, AreaId) VALUES ('Toilet', 6)
INSERT INTO Inventory (Name, AreaId) VALUES ('Bathroom Sink', 6)
INSERT INTO Inventory (Name, AreaId) VALUES ('Bathroom Countertops', 6 )
INSERT INTO Inventory (Name, AreaId) VALUES ('Showerhead', 6)
INSERT INTO Inventory (Name, AreaId) VALUES ('Bath/Shower Surround', 6)
INSERT INTO Inventory (Name, AreaId) VALUES ('Bathroom Fan', 6)


INSERT INTO Inventory (Name, AreaId) VALUES ('Hardwood Flooring', 7)
INSERT INTO Inventory (Name, AreaId) VALUES ('Carpet Flooring', 7)
INSERT INTO Inventory (Name, AreaId) VALUES ('Tile Flooring', 7)
INSERT INTO Inventory (Name, AreaId) VALUES ('Stone Flooring', 7)
INSERT INTO Inventory (Name, AreaId) VALUES ('Vinyl/Laminate Flooring', 7)
INSERT INTO Inventory (Name, AreaId) VALUES ('Linoleum Flooring', 7)





INSERT INTO Upkeep (Title, InventoryId, Duration, NumberOfMonths, Description) VALUES ('Change water filter',1, 6, 'By removing the used filter and installing a new one, you can effeciently remove impurities from your tap water')
INSERT INTO Upkeep (Title, InventoryId, Duration, NumberOfMonths, Description) VALUES ('Dust condenser coils',1, 6, 'Removing dust from the coils allows for better airflow and cooling, which can extend the life of your fridge')
INSERT INTO Upkeep (Title, InventoryId, Duration, NumberOfMonths, Description) VALUES ('Check the Gasket',1, 6, 'Cleaning the rubber seal around the perimeter of your fridge can help to maximize cooling power')
INSERT INTO Upkeep (Title, InventoryId, Duration, NumberOfMonths, Description) VALUES ('Degrease the controls',2, 6, 'This will help keep your controls from sticking or becoming loose')
INSERT INTO Upkeep (Title, InventoryId, Duration, NumberOfMonths, Description) VALUES ('Wipe down oven',2, 6, 'Scrub stuck on stains that can lead to smoke and lingering odors')
INSERT INTO Upkeep (Title, InventoryId, Duration, NumberOfMonths, Description) VALUES ('Deep clean cooktop',2,, 6, 'Typically using a single-edge razor can help to remove stuck on stains, apply a specialized cooktop cleaner to add a nice polish')
INSERT INTO Upkeep (Title, InventoryId, Duration, NumberOfMonths, Description) VALUES ('Degunk the door seal',3, 3, 'Find the seal around the perimeter and wipe down with vinegar or cleaing agent of your choice. This gunk and grime can lead to mold and leaks')
INSERT INTO Upkeep (Title, InventoryId, Duration, NumberOfMonths, Description) VALUES ('Clean the filter',3, 3, 'First remove the cylinder filter from the base of the machine, check for damage, rinse and wipe away any debris, and replace')
INSERT INTO Upkeep (Title, InventoryId, Duration, NumberOfMonths, Description) VALUES ('Remove hard-water residue',3, 3, 'Look for mineral deposits inside your machine, using a citric based dishawasher cleaner would be best used for this')
INSERT INTO Upkeep (Title, InventoryId, Duration, NumberOfMonths, Description) VALUES ('Contain leaks',4, 12, 'Check for tell-tale signs like a dripping faucet or water stains, leaks typical caused by an O-ring can hopefully be fixed with just a replacement')
INSERT INTO Upkeep (Title, InventoryId, Duration, NumberOfMonths, Description) VALUES ('Contain clogs',4, 12, 'Look for tell-tale signs of a clog, if necessary take some time to deal with potential clogs using a plunger or drain snake')
INSERT INTO Upkeep (Title, InventoryId, Duration, NumberOfMonths, Description) VALUES ('Do a deep clean',5, 12, 'Consider the finish of your cabinets, using a cleaning solution to remove dust and grime build up.')
INSERT INTO Upkeep (Title, InventoryId, Duration, NumberOfMonths, Description) VALUES ('Spot repairs, as needed',5, 12, 'Check for things like loose door hinges, and shelves. By keeping screws tightened, you can help extend the life of your cabinets')
INSERT INTO Upkeep (Title, InventoryId, Duration, NumberOfMonths, Description) VALUES ('Do a deep clean',6, 3, 'Consider the finish of your countertops, using a mild soap and a soft sponge or cloth to prep the area and baking soda and water for tougher stains.')
INSERT INTO Upkeep (Title, InventoryId, Duration, NumberOfMonths, Description) VALUES ('Spot repairs, as needed',6, 12, 'Check for things like loose door hinges, and shelves. By keeping screws tightened, you can help extend the life of your cabinets')
