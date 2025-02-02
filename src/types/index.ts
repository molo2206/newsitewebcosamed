export * from './User'

export type Languages = {
    language: string;
    comprehension: string;
    writing: string;
    reading: string;
    speaking: string;
}

export type Education = {
    title_edu?: string;
    institution?: string;
    endDate_edu?: string;
}

export type Experience = {
    job_title_ex?: string;
    company_name_exp?: string;
    start_date_exp?: string;
    end_date_exp?: string;
    description_exp?: string;
}
export type Skills = {
    skill_name?: string;
}
export type Attestations = {
    title_attestation?: string;
    file_attestation?: string;
    date_delivrance_attestation?: string;
}

export type ApplyForm = {
    //Mes informations
    id?: string;
    phone?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
    keyword?: string;
    old_password?: string;
    new_password?: string;
    otp?: number;
    country?: string;
    town?: string;
    gender?: string;
    full_name?: string;
    cover_letter?: any;
    cv?: any;
    carte?: any,
    dossier?: any,
    image?: any;
    first_name?: string;
    last_name?: string;
    message?: string;
    currency?: string;
    amount?: string;
    custom_amount?: number;
    name?: string;
    prename?: string;
    typemembre?: string;
    thematique?: string;
    ville?: string;
    profession?: string;
    sexe?: string;
    num_ordre?: string;
    corporation?: string;
    motif?: string;

    //Languages
    languages?: Languages[]
    //Education
    educations?: Education[];
    //experiences
    experiences?: Experience[];
    //Competences
    skills?: Skills[]
    //Attestations/certificats
    attestations?: Attestations[];

}
