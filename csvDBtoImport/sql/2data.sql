INSERT INTO categories (id, libelle, description)
VALUES
(1, "Classique", "description classique"),
(2, "Veggie", "description veggie"),
(3, "World", "description world"),
(4, "Chaud", "description chaud");
INSERT INTO sandwiches (id, libelle, description, prix, id_category)
VALUES
(1, "Panini Poulet", "Filet de poulet, sauce algérienne, cheddar", 2.40000, 4),
(2, "Club Sandwich", "Bacon, laitue, tomate, mayonnaise", 2.20000, 1),
(3, "Falafel Wrap", "Falafels dans un wrap", 5.00000, 2),
(4, "Shawarma", "Kebab en wrap la genre", 3.00000, 3),
(5, "Croque monsieur", "Jambon emmental bechamelle", 2.80000, 3),
(6, "Philly Cheesesteak", "Steak et oignons biens cuits avec provolone", 3.50000, 4),
(7, "le fermier", "Filets de poulet, roquette, tomate, miel, moutarde", 2.40000, 1),
(8, "Le montagnard", "Sauce raclette-lardon-oignon, rondelles de pomme de terre, pancetta", 4.50000, 1);
