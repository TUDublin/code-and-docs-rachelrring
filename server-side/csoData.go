package main

type HS067row struct {
	Region     string
	IncomeType string
	Value      float64
}

type HS0672015 struct {
	Rows []HS067row
}

type HS067rowRegion struct {
	IncomeType string
	Value      float64
}

type HS0672015Region struct {
	State     []HS067rowRegion
	Border    []HS067rowRegion
	Midland   []HS067rowRegion
	West      []HS067rowRegion
	Dublin    []HS067rowRegion
	MidEast   []HS067rowRegion
	MidWest   []HS067rowRegion
	SouthEast []HS067rowRegion
	SouthWest []HS067rowRegion
}

type HS208row struct {
	ExpenditureType string
	HouseholdSize   string
	Value           float64
}

type HS2082015 struct {
	Rows []HS208row
}

// unneeded due to bug #18
// type AverageEarnings struct {
// 	Class     string `json:"class"`
// 	Dimension struct {
// 		STATISTIC struct {
// 			Category struct {
// 				Index []string `json:"index"`
// 				Label struct {
// 					EHQ03C01 string `json:"EHQ03C01"`
// 					EHQ03C02 string `json:"EHQ03C02"`
// 					EHQ03C03 string `json:"EHQ03C03"`
// 					EHQ03C04 string `json:"EHQ03C04"`
// 					EHQ03C05 string `json:"EHQ03C05"`
// 					EHQ03C06 string `json:"EHQ03C06"`
// 					EHQ03C07 string `json:"EHQ03C07"`
// 					EHQ03C08 string `json:"EHQ03C08"`
// 					EHQ03C09 string `json:"EHQ03C09"`
// 					EHQ03C10 string `json:"EHQ03C10"`
// 					EHQ03C11 string `json:"EHQ03C11"`
// 					EHQ03S2  string `json:"EHQ03S2"`
// 					EHQ03S3  string `json:"EHQ03S3"`
// 					EHQ03S4  string `json:"EHQ03S4"`
// 					EHQ03S5  string `json:"EHQ03S5"`
// 					EHQ03S6  string `json:"EHQ03S6"`
// 					EHQ03S7  string `json:"EHQ03S7"`
// 					EHQ03S8  string `json:"EHQ03S8"`
// 					EHQ03S9  string `json:"EHQ03S9"`
// 					EHQ03S10 string `json:"EHQ03S10"`
// 					EHQ03S11 string `json:"EHQ03S11"`
// 				} `json:"label"`
// 				Unit struct {
// 					EHQ03C01 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03C01"`
// 					EHQ03C02 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03C02"`
// 					EHQ03C03 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03C03"`
// 					EHQ03C04 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03C04"`
// 					EHQ03C05 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03C05"`
// 					EHQ03C06 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03C06"`
// 					EHQ03C07 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03C07"`
// 					EHQ03C08 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03C08"`
// 					EHQ03C09 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03C09"`
// 					EHQ03C10 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03C10"`
// 					EHQ03C11 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03C11"`
// 					EHQ03S2 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03S2"`
// 					EHQ03S3 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03S3"`
// 					EHQ03S4 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03S4"`
// 					EHQ03S5 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03S5"`
// 					EHQ03S6 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03S6"`
// 					EHQ03S7 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03S7"`
// 					EHQ03S8 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03S8"`
// 					EHQ03S9 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03S9"`
// 					EHQ03S10 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03S10"`
// 					EHQ03S11 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ03S11"`
// 				} `json:"unit"`
// 			} `json:"category"`
// 			Label string `json:"label"`
// 		} `json:"STATISTIC"`
// 		TLISTQ1 struct {
// 			Category struct {
// 				Index []string `json:"index"`
// 				Label struct {
// 					Num20081 string `json:"20081"`
// 					Num20082 string `json:"20082"`
// 					Num20083 string `json:"20083"`
// 					Num20084 string `json:"20084"`
// 					Num20091 string `json:"20091"`
// 					Num20092 string `json:"20092"`
// 					Num20093 string `json:"20093"`
// 					Num20094 string `json:"20094"`
// 					Num20101 string `json:"20101"`
// 					Num20102 string `json:"20102"`
// 					Num20103 string `json:"20103"`
// 					Num20104 string `json:"20104"`
// 					Num20111 string `json:"20111"`
// 					Num20112 string `json:"20112"`
// 					Num20113 string `json:"20113"`
// 					Num20114 string `json:"20114"`
// 					Num20121 string `json:"20121"`
// 					Num20122 string `json:"20122"`
// 					Num20123 string `json:"20123"`
// 					Num20124 string `json:"20124"`
// 					Num20131 string `json:"20131"`
// 					Num20132 string `json:"20132"`
// 					Num20133 string `json:"20133"`
// 					Num20134 string `json:"20134"`
// 					Num20141 string `json:"20141"`
// 					Num20142 string `json:"20142"`
// 					Num20143 string `json:"20143"`
// 					Num20144 string `json:"20144"`
// 					Num20151 string `json:"20151"`
// 					Num20152 string `json:"20152"`
// 					Num20153 string `json:"20153"`
// 					Num20154 string `json:"20154"`
// 					Num20161 string `json:"20161"`
// 					Num20162 string `json:"20162"`
// 					Num20163 string `json:"20163"`
// 					Num20164 string `json:"20164"`
// 					Num20171 string `json:"20171"`
// 					Num20172 string `json:"20172"`
// 					Num20173 string `json:"20173"`
// 					Num20174 string `json:"20174"`
// 					Num20181 string `json:"20181"`
// 					Num20182 string `json:"20182"`
// 					Num20183 string `json:"20183"`
// 					Num20184 string `json:"20184"`
// 					Num20191 string `json:"20191"`
// 					Num20192 string `json:"20192"`
// 					Num20193 string `json:"20193"`
// 					Num20194 string `json:"20194"`
// 					Num20201 string `json:"20201"`
// 					Num20202 string `json:"20202"`
// 					Num20203 string `json:"20203"`
// 					Num20204 string `json:"20204"`
// 					Num20211 string `json:"20211"`
// 					Num20212 string `json:"20212"`
// 					Num20213 string `json:"20213"`
// 					Num20214 string `json:"20214"`
// 					Num20221 string `json:"20221"`
// 					Num20222 string `json:"20222"`
// 					Num20223 string `json:"20223"`
// 					Num20224 string `json:"20224"`
// 					Num20231 string `json:"20231"`
// 					Num20232 string `json:"20232"`
// 					Num20233 string `json:"20233"`
// 					Num20234 string `json:"20234"`
// 				} `json:"label"`
// 			} `json:"category"`
// 			Label string `json:"label"`
// 		} `json:"TLIST(Q1)"`
// 	} `json:"dimension"`
// 	Extension struct {
// 		Matrix   string   `json:"matrix"`
// 		Reasons  []string `json:"reasons"`
// 		Language struct {
// 			Code string `json:"code"`
// 			Name string `json:"name"`
// 		} `json:"language"`
// 		Elimination struct {
// 			C02665V03225 string `json:"C02665V03225"`
// 			C02397V02888 string `json:"C02397V02888"`
// 		} `json:"elimination"`
// 		Contact struct {
// 			Name  string `json:"name"`
// 			Email string `json:"email"`
// 			Phone string `json:"phone"`
// 		} `json:"contact"`
// 		Subject struct {
// 			Code  int    `json:"code"`
// 			Value string `json:"value"`
// 		} `json:"subject"`
// 		Product struct {
// 			Code  string `json:"code"`
// 			Value string `json:"value"`
// 		} `json:"product"`
// 		Official  bool `json:"official"`
// 		Copyright struct {
// 			Name string `json:"name"`
// 			Code string `json:"code"`
// 			Href string `json:"href"`
// 		} `json:"copyright"`
// 		Exceptional  bool `json:"exceptional"`
// 		Reservation  bool `json:"reservation"`
// 		Archive      bool `json:"archive"`
// 		Experimental bool `json:"experimental"`
// 		Analytical   bool `json:"analytical"`
// 	} `json:"extension"`
// 	Href  string   `json:"href"`
// 	ID    []string `json:"id"`
// 	Label string   `json:"label"`
// 	Link  struct {
// 		Alternate []struct {
// 			Type string `json:"type"`
// 			Href string `json:"href"`
// 		} `json:"alternate"`
// 	} `json:"link"`
// 	Note []string `json:"note"`
// 	Role struct {
// 		Metric []string `json:"metric"`
// 		Time   []string `json:"time"`
// 	} `json:"role"`
// 	Size    []int         `json:"size"`
// 	Updated time.Time     `json:"updated"`
// 	Value   []interface{} `json:"value"`
// 	Version string        `json:"version"`
// }

// unneeded due to bug #18
// type dataCSO struct {
// 	Class     string `json:"class"`
// 	Dimension struct {
// 		STATISTIC struct {
// 			Category struct {
// 				Index []string `json:"index"`
// 				Label struct {
// 					EHQ04C01 string `json:"EHQ04C01"`
// 					EHQ04C02 string `json:"EHQ04C02"`
// 					EHQ04C03 string `json:"EHQ04C03"`
// 					EHQ04C04 string `json:"EHQ04C04"`
// 					EHQ04C05 string `json:"EHQ04C05"`
// 					EHQ04C06 string `json:"EHQ04C06"`
// 					EHQ04C07 string `json:"EHQ04C07"`
// 					EHQ04S1  string `json:"EHQ04S1"`
// 					EHQ04S2  string `json:"EHQ04S2"`
// 					EHQ04S3  string `json:"EHQ04S3"`
// 					EHQ04S4  string `json:"EHQ04S4"`
// 					EHQ04S5  string `json:"EHQ04S5"`
// 					EHQ04S6  string `json:"EHQ04S6"`
// 					EHQ04S7  string `json:"EHQ04S7"`
// 				} `json:"label"`
// 				Unit struct {
// 					EHQ04C01 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ04C01"`
// 					EHQ04C02 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ04C02"`
// 					EHQ04C03 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ04C03"`
// 					EHQ04C04 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ04C04"`
// 					EHQ04C05 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ04C05"`
// 					EHQ04C06 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ04C06"`
// 					EHQ04C07 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ04C07"`
// 					EHQ04S1 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ04S1"`
// 					EHQ04S2 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ04S2"`
// 					EHQ04S3 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ04S3"`
// 					EHQ04S4 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ04S4"`
// 					EHQ04S5 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ04S5"`
// 					EHQ04S6 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ04S6"`
// 					EHQ04S7 struct {
// 						Decimals int    `json:"decimals"`
// 						Label    string `json:"label"`
// 						Position string `json:"position"`
// 					} `json:"EHQ04S7"`
// 				} `json:"unit"`
// 			} `json:"category"`
// 			Label string `json:"label"`
// 		} `json:"STATISTIC"`
// 		TLISTQ1 struct {
// 			Category struct {
// 				Index []string `json:"index"`
// 				Label struct {
// 					Num20081 string `json:"20081"`
// 					Num20082 string `json:"20082"`
// 					Num20083 string `json:"20083"`
// 					Num20084 string `json:"20084"`
// 					Num20091 string `json:"20091"`
// 					Num20092 string `json:"20092"`
// 					Num20093 string `json:"20093"`
// 					Num20094 string `json:"20094"`
// 					Num20101 string `json:"20101"`
// 					Num20102 string `json:"20102"`
// 					Num20103 string `json:"20103"`
// 					Num20104 string `json:"20104"`
// 					Num20111 string `json:"20111"`
// 					Num20112 string `json:"20112"`
// 					Num20113 string `json:"20113"`
// 					Num20114 string `json:"20114"`
// 					Num20121 string `json:"20121"`
// 					Num20122 string `json:"20122"`
// 					Num20123 string `json:"20123"`
// 					Num20124 string `json:"20124"`
// 					Num20131 string `json:"20131"`
// 					Num20132 string `json:"20132"`
// 					Num20133 string `json:"20133"`
// 					Num20134 string `json:"20134"`
// 					Num20141 string `json:"20141"`
// 					Num20142 string `json:"20142"`
// 					Num20143 string `json:"20143"`
// 					Num20144 string `json:"20144"`
// 					Num20151 string `json:"20151"`
// 					Num20152 string `json:"20152"`
// 					Num20153 string `json:"20153"`
// 					Num20154 string `json:"20154"`
// 					Num20161 string `json:"20161"`
// 					Num20162 string `json:"20162"`
// 					Num20163 string `json:"20163"`
// 					Num20164 string `json:"20164"`
// 					Num20171 string `json:"20171"`
// 					Num20172 string `json:"20172"`
// 					Num20173 string `json:"20173"`
// 					Num20174 string `json:"20174"`
// 					Num20181 string `json:"20181"`
// 					Num20182 string `json:"20182"`
// 					Num20183 string `json:"20183"`
// 					Num20184 string `json:"20184"`
// 					Num20191 string `json:"20191"`
// 					Num20192 string `json:"20192"`
// 					Num20193 string `json:"20193"`
// 					Num20194 string `json:"20194"`
// 					Num20201 string `json:"20201"`
// 					Num20202 string `json:"20202"`
// 					Num20203 string `json:"20203"`
// 					Num20204 string `json:"20204"`
// 					Num20211 string `json:"20211"`
// 					Num20212 string `json:"20212"`
// 					Num20213 string `json:"20213"`
// 					Num20214 string `json:"20214"`
// 					Num20221 string `json:"20221"`
// 					Num20222 string `json:"20222"`
// 					Num20223 string `json:"20223"`
// 					Num20224 string `json:"20224"`
// 					Num20231 string `json:"20231"`
// 					Num20232 string `json:"20232"`
// 					Num20233 string `json:"20233"`
// 				} `json:"label"`
// 			} `json:"category"`
// 			Label string `json:"label"`
// 		} `json:"TLIST(Q1)"`
// 		C02398V02889 struct {
// 			Category struct {
// 				Index []string `json:"index"`
// 				Label struct {
// 					Num299 string `json:"299"`
// 					Num321 string `json:"321"`
// 					Num441 string `json:"441"`
// 				} `json:"label"`
// 			} `json:"category"`
// 			Label string `json:"label"`
// 		} `json:"C02398V02889"`
// 		C02665V03225 struct {
// 			Category struct {
// 				Index []string `json:"index"`
// 				Label struct {
// 					NAMING_FAILED string `json:"-"`
// 					F             string `json:"F"`
// 					G             string `json:"G"`
// 					H             string `json:"H"`
// 					I             string `json:"I"`
// 					J             string `json:"J"`
// 					M             string `json:"M"`
// 					N             string `json:"N"`
// 					O             string `json:"O"`
// 					P             string `json:"P"`
// 					Q             string `json:"Q"`
// 					Y0900         string `json:"Y0900"`
// 					Y3500         string `json:"Y3500"`
// 					Y7500         string `json:"Y7500"`
// 				} `json:"label"`
// 			} `json:"category"`
// 			Label string `json:"label"`
// 		} `json:"C02665V03225"`
// 	} `json:"dimension"`
// 	Extension struct {
// 		Matrix   string   `json:"matrix"`
// 		Reasons  []string `json:"reasons"`
// 		Language struct {
// 			Code string `json:"code"`
// 			Name string `json:"name"`
// 		} `json:"language"`
// 		Elimination struct {
// 			C02398V02889 interface{} `json:"C02398V02889"`
// 			C02665V03225 string      `json:"C02665V03225"`
// 		} `json:"elimination"`
// 		Contact struct {
// 			Name  string `json:"name"`
// 			Email string `json:"email"`
// 			Phone string `json:"phone"`
// 		} `json:"contact"`
// 		Subject struct {
// 			Code  int    `json:"code"`
// 			Value string `json:"value"`
// 		} `json:"subject"`
// 		Product struct {
// 			Code  string `json:"code"`
// 			Value string `json:"value"`
// 		} `json:"product"`
// 		Official  bool `json:"official"`
// 		Copyright struct {
// 			Name string `json:"name"`
// 			Code string `json:"code"`
// 			Href string `json:"href"`
// 		} `json:"copyright"`
// 		Exceptional  bool `json:"exceptional"`
// 		Reservation  bool `json:"reservation"`
// 		Archive      bool `json:"archive"`
// 		Experimental bool `json:"experimental"`
// 		Analytical   bool `json:"analytical"`
// 	} `json:"extension"`
// 	Href  string   `json:"href"`
// 	ID    []string `json:"id"`
// 	Label string   `json:"label"`
// 	Link  struct {
// 		Alternate []struct {
// 			Type string `json:"type"`
// 			Href string `json:"href"`
// 		} `json:"alternate"`
// 	} `json:"link"`
// 	Note []string `json:"note"`
// 	Role struct {
// 		Metric []string `json:"metric"`
// 		Time   []string `json:"time"`
// 	} `json:"role"`
// 	Size    []int         `json:"size"`
// 	Updated time.Time     `json:"updated"`
// 	Value   []interface{} `json:"value"`
// 	Version string        `json:"version"`
// }

// // unneeded due to bug #18
// type Data struct {
// 	Dataset struct {
// 		Dimension struct {
// 			STATISTIC struct {
// 				Label    string `json:"label"`
// 				Category struct {
// 					Index struct {
// 						HS067 int `json:"HS067"`
// 					} `json:"index"`
// 					Label struct {
// 						HS067 string `json:"HS067"`
// 					} `json:"label"`
// 					Unit struct {
// 						HS067 struct {
// 							Base string `json:"base"`
// 						} `json:"HS067"`
// 					} `json:"unit"`
// 				} `json:"category"`
// 			} `json:"STATISTIC"`
// 			C02196V02652 struct {
// 				Label    string `json:"label"`
// 				Category struct {
// 					Index struct {
// 						NAMING_FAILED int `json:"-"`
// 						IE11          int `json:"IE11"`
// 						IE12          int `json:"IE12"`
// 						IE13          int `json:"IE13"`
// 						IE21          int `json:"IE21"`
// 						IE22          int `json:"IE22"`
// 						IE23          int `json:"IE23"`
// 						IE24          int `json:"IE24"`
// 						IE25          int `json:"IE25"`
// 					} `json:"index"`
// 					Label struct {
// 						NAMING_FAILED string `json:"-"`
// 						IE11          string `json:"IE11"`
// 						IE12          string `json:"IE12"`
// 						IE13          string `json:"IE13"`
// 						IE21          string `json:"IE21"`
// 						IE22          string `json:"IE22"`
// 						IE23          string `json:"IE23"`
// 						IE24          string `json:"IE24"`
// 						IE25          string `json:"IE25"`
// 					} `json:"label"`
// 				} `json:"category"`
// 			} `json:"C02196V02652"`
// 			C03371V04073 struct {
// 				Label    string `json:"label"`
// 				Category struct {
// 					Index struct {
// 						Num10 int `json:"10"`
// 						Num11 int `json:"11"`
// 						Num12 int `json:"12"`
// 						Num13 int `json:"13"`
// 						Num14 int `json:"14"`
// 						Num15 int `json:"15"`
// 						Num16 int `json:"16"`
// 						Num17 int `json:"17"`
// 						Num18 int `json:"18"`
// 						Num19 int `json:"19"`
// 						Num20 int `json:"20"`
// 						Num01 int `json:"01"`
// 						Num02 int `json:"02"`
// 						Num03 int `json:"03"`
// 						Num04 int `json:"04"`
// 						Num05 int `json:"05"`
// 						Num06 int `json:"06"`
// 						Num07 int `json:"07"`
// 						Num08 int `json:"08"`
// 						Num09 int `json:"09"`
// 					} `json:"index"`
// 					Label struct {
// 						Num10 string `json:"10"`
// 						Num11 string `json:"11"`
// 						Num12 string `json:"12"`
// 						Num13 string `json:"13"`
// 						Num14 string `json:"14"`
// 						Num15 string `json:"15"`
// 						Num16 string `json:"16"`
// 						Num17 string `json:"17"`
// 						Num18 string `json:"18"`
// 						Num19 string `json:"19"`
// 						Num20 string `json:"20"`
// 						Num01 string `json:"01"`
// 						Num02 string `json:"02"`
// 						Num03 string `json:"03"`
// 						Num04 string `json:"04"`
// 						Num05 string `json:"05"`
// 						Num06 string `json:"06"`
// 						Num07 string `json:"07"`
// 						Num08 string `json:"08"`
// 						Num09 string `json:"09"`
// 					} `json:"label"`
// 				} `json:"category"`
// 			} `json:"C03371V04073"`
// 			TLISTA1 struct {
// 				Label    string `json:"label"`
// 				Category struct {
// 					Index struct {
// 						Num2015 int `json:"2015"`
// 					} `json:"index"`
// 					Label struct {
// 						Num2015 string `json:"2015"`
// 					} `json:"label"`
// 				} `json:"category"`
// 			} `json:"TLIST(A1)"`
// 			Role struct {
// 				Metric []string `json:"metric"`
// 				Time   []string `json:"time"`
// 			} `json:"role"`
// 			ID   []string `jsonnumber
// 			Size []int    `json:"size"`
// 		} `json:"dimension"`
// 		Label   string    `json:"label"`
// 		Source  string    `json:"source"`
// 		Updated time.Time `json:"updated"`
// 		Value   []float64 `json:"value"`
// 	} `json:"dataset"`
// }

// unneeded due to bug #18
// type AvgResponse struct {
// 	Message      string
// 	DataReturned Data
// 	AvgEarnings  float64
// }
