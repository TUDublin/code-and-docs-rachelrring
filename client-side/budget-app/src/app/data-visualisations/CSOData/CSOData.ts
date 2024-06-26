export interface HS067rowRegion {
	IncomeType: string;
	Value: number;
}

export interface HS0672015Region {
	State: HS067rowRegion[];
	Border: HS067rowRegion[];
	Midland: HS067rowRegion[];
	West: HS067rowRegion[];
	Dublin: HS067rowRegion[];
	MidEast: HS067rowRegion[];
	MidWest: HS067rowRegion[];
	SouthEast: HS067rowRegion[];
	SouthWest: HS067rowRegion[];
}

export interface HS208row {
	ExpenditureType: string;
	HouseholdSize: string;
	Value: number;
}

export interface HS2082015 {
	Rows: HS208row[];
}

