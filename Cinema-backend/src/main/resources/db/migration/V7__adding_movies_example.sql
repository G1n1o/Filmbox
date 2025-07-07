INSERT INTO movies (title, description, duration, poster_url) VALUES
('Inception', 'Dom Cobb to złodziej, który potrafi kraść sekrety ze snów. Dostaje zadanie nie włamania się do umysłu, lecz wszczepienia w nim idei.', 148, 'assets/posters/inception.jpg'),
('Interstellar', 'Grupa astronautów wyrusza przez tunel czasoprzestrzenny, aby znaleźć nowy dom dla ludzkości na wygasającej Ziemi.', 169, 'assets/posters/interstellar.jpg'),
('The Matrix', 'Neo odkrywa, że rzeczywistość, którą zna, jest symulacją, a on może być wybrańcem, który zmieni losy świata.', 136, 'assets/posters/the_matrix.jpg'),
('Spider-Man: No Way Home', 'Tożsamość Spider-Mana wychodzi na jaw. Peter Parker szuka pomocy u Doktora Strange’a, ale zaklęcie ma nieoczekiwane skutki.', 148, 'assets/posters/spider-man_no_way_home.jpg'),
('Vaiana: Skarb oceanu', 'Vaiana, odważna dziewczyna z wyspiarskiego plemienia, wyrusza w pełną przygód podróż przez ocean, by uratować swoją społeczność. Z pomocą półboga Maui odkrywa, kim naprawdę jest, i jak wielka siła drzemie w niej samej.', 107, 'assets/posters/vaiana.jpg');

INSERT INTO screening (movie_id, cinema_hall_id, screening_time) VALUES
(1, 1, '2025-07-10 18:00:00'),
(2, 2, '2025-07-10 20:30:00'),
(3, 1, '2025-07-11 17:00:00'),
(4, 3, '2025-07-11 21:00:00'),
(5, 2, '2025-07-12 19:30:00');