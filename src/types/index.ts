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
    country?: string;
    town?: string;
    gender?: string;
    full_name?: string;
    cover_letter?: string;
    cv?: string;
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
