export default interface IPerson {
    name: string;
    height?: string;
    mass?: string;
    hair_color?:string;
    skin_color?:string;
    eye_color?:string;
    birth_year?:string;
    gender?:string;
    /*

    films string -- The URL root for Film resources
    people string -- The URL root for People resources
    planets string -- The URL root for Planet resources
    species string -- The URL root for Species resources
    starships string -- The URL root for Starships resources
    vehicles string -- The URL root for Vehicles resources

    */
    homeworld?:string;
    homeworldName?:string;
    films?:string[];
    filmNames?:string[];
    species?:string[];
    starships?:string[];
    starshipNames?:string[];
    vehicles?:string[];
    vehicleNames?:string[];
 }
 
 