import { CinemaHall } from "./cinema-hall";
import { Movie } from "./movie";

export interface Screening {
    id:number;
    movie: Movie;
    cinemaHall: CinemaHall;
    screeningTime: string;
}
