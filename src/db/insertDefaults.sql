INSERT INTO service_category (name) VALUES('home'), ('business');

INSERT INTO connection_type (name) VALUES('dsl'), ('cable'), ('fiber');

INSERT INTO internet_service (
  name,
  label,
  description,
  service_category_id,
  connection_type_id,
  bandwidth_down,
  bandwidth_up,
  price,
  ideal_num_users,
  ideal_num_devices)
VALUES 
  ('dsl3', 'DSL3', 'Basic internet connectivity needs, email.', 1, 1, 3, 1, 40, '1', '1'),
  ('dsl7', 'DSL7', 'Stream content to watch or listen to.', 1, 1, 7, 1, 45, '2', '2'),
  ('cable30', 'CABLE30', 'Stream more demanding content in better quality.', 1, 2, 30, 10, 55, '3-4', '4-6'),
  ('cable70', 'CABLE70', 'Stream higher quality content.', 1, 2, 70, 10, 65, '4', '8'),
  ('fiber100', 'FIBER100', 'Get and give things fast.', 1, 3, 100, 30, 80, '5+', '10+'),
  ('fiber100plus', 'FIBER100+', 'Get and give things fast.', 2, 3, 100, 100, 85, '5+', '10+'),
  ('fiber300', 'FIBER300', 'Blaze your way to content delivery.', 1, 3, 300, 100, 90, '7+', '14+'),
  ('fiber1000', 'FIBER1000', 'There''s no stopping you.', 1, 3, 1000, 300, 110, '10+', '20+'),
  ('fiber1000plus', 'FIBER1000+', 'There''s no stopping you.', 2, 3, 1000, 1000, 150, '10+', '20+'),
  ('fiber1600', 'FIBER1600', 'Top of the line.', 2, 3, 1600, 1600, 150, '20+', '40+');
