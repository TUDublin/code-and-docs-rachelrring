using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace budget_server
{
    public class User : IdentityUser
    {
    }

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserForRegistrationDto, User>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.Email));
        }
    }

    public class Budget
    {
        [Key]
        public required string UserId { get; set; }
        public double IncomePay { get; set; }
        public double IncomeBenefits { get; set; }
        public double IncomePension { get; set; }
        public double IncomeOther { get; set; }
        public double PaymentMortgage { get; set; }
        public double PaymentRent { get; set; }
        public double PaymentHomeInsurance { get; set; }
        public double PaymentHouseTax { get; set; }
        public double PaymentHouseGas { get; set; }
        public double PaymentElectricity { get; set; }
        public double PaymentWater { get; set; }
        public double PaymentHomePhone { get; set; }
        public double PaymentMobilePhone { get; set; }
        public double PaymentBroadband { get; set; }
        public double PaymentTvLicense { get; set; }
        public double PaymentHomeMaintenance { get; set; }
        public double PaymentGroceries { get; set; }
        public double PaymentTakeaways { get; set; }
        public double PaymentCigarettes { get; set; }
        public double PaymentEatingOut { get; set; }
        public double PaymentClothing { get; set; }
        public double PaymentChildcare { get; set; }
        public double PaymentHealthandBeauty { get; set; }
        public double PaymentEyeCare { get; set; }
        public double PaymentDentalCare { get; set; }
        public double PaymentMedicine { get; set; }
        public double PaymentActivities { get; set; }
        public double PaymentPocketMoney { get; set; }
        public double PaymentChildSupport { get; set; }
        public double PaymentSchoolFees { get; set; }
        public double PaymentPetFood { get; set; }
        public double PaymentVetBills { get; set; }
        public double PaymentLifeInsurance { get; set; }
        public double PaymentHealthInsurance { get; set; }
        public double PaymentDentalInsurance { get; set; }
        public double PaymentPetInsurance { get; set; }
        public double PaymentCarInsurance { get; set; }
        public double PaymentBankFees { get; set; }
        public double PaymentLoan { get; set; }
        public double PaymentCreditCard { get; set; }
        public double PaymentHirePurchases { get; set; }
        public double PaymentInvestments { get; set; }
        public double PaymentPension { get; set; }
        public double PaymentCarFuel { get; set; }
        public double PaymentCarTax { get; set; }
        public double PaymentCarMaintenance { get; set; }
        public double PaymentPublicTransport { get; set; }
        public double PaymentGym { get; set; }
        public double PaymentStreamingServices { get; set; }
        public double PaymentHolidays { get; set; }
        public double PaymentOther { get; set; }
        public double IncomeTotal { get; set; }
        public double PaymentTotal { get; set; }
    }

}
