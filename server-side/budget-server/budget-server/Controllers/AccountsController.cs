using AutoMapper;
using budget_server;
using budget_server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace budget_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly JwtHandler _jwtHandler;
        private readonly budget_serverContext _context;

        public AccountsController(UserManager<User> userManager, IMapper mapper, JwtHandler jwtHandler, budget_serverContext context)
        {
            _userManager = userManager;
            _mapper = mapper;
            _jwtHandler = jwtHandler;
            _context = context;
        }
        [HttpPost("Registration")]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto userForRegistration)
        {
            if (userForRegistration == null || !ModelState.IsValid)
                return BadRequest();

            var user = _mapper.Map<User>(userForRegistration);
            var result = await _userManager.CreateAsync(user, userForRegistration.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);

                return BadRequest(new RegistrationResponseDto { Errors = errors });
            }

            return StatusCode(201);
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserForAuthenticationDto userForAuthentication)
        {
            var user = await _userManager.FindByNameAsync(userForAuthentication.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, userForAuthentication.Password))
                return Unauthorized(new AuthResponseDto { ErrorMessage = "Invalid Authentication" });

            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Token = token });
        }
        // POST: /api/Accounts/NewBudget
        [HttpPost("NewBudget")]
        public async Task<ActionResult> PostBudget([FromBody] BudgetToSaveDto budget)
        {
            var user = await _userManager.FindByEmailAsync(budget.UserEmail);

            if (user == null || !ModelState.IsValid)
                return BadRequest("User Error");


            Budget newBudget = new Budget
            {
                UserId = user.Id,
                IncomePay = budget.IncomePay,
                IncomeBenefits = budget.IncomeBenefits,
                IncomePension = budget.IncomePension,
                IncomeOther = budget.IncomeOther,
                PaymentMortgage = budget.PaymentMortgage,
                PaymentRent = budget.PaymentRent,
                PaymentHomeInsurance = budget.PaymentHomeInsurance,
                PaymentHouseTax = budget.PaymentHouseTax,
                PaymentHouseGas = budget.PaymentHouseGas,
                PaymentElectricity = budget.PaymentElectricity,
                PaymentWater = budget.PaymentWater,
                PaymentHomePhone = budget.PaymentHomePhone,
                PaymentMobilePhone = budget.PaymentMobilePhone,
                PaymentBroadband = budget.PaymentBroadband,
                PaymentTvLicense = budget.PaymentTvLicense,
                PaymentHomeMaintenance = budget.PaymentHomeMaintenance,
                PaymentGroceries = budget.PaymentGroceries,
                PaymentTakeaways = budget.PaymentTakeaways,
                PaymentCigarettes = budget.PaymentCigarettes,
                PaymentEatingOut = budget.PaymentEatingOut,
                PaymentClothing = budget.PaymentClothing,
                PaymentChildcare = budget.PaymentChildcare,
                PaymentHealthandBeauty = budget.PaymentHealthandBeauty,
                PaymentEyeCare = budget.PaymentEyeCare,
                PaymentDentalCare = budget.PaymentDentalCare,
                PaymentMedicine = budget.PaymentMedicine,
                PaymentActivities = budget.PaymentActivities,
                PaymentPocketMoney = budget.PaymentPocketMoney,
                PaymentChildSupport = budget.PaymentChildSupport,
                PaymentSchoolFees = budget.PaymentSchoolFees,
                PaymentPetFood = budget.PaymentPetFood,
                PaymentVetBills = budget.PaymentVetBills,
                PaymentLifeInsurance = budget.PaymentLifeInsurance,
                PaymentHealthInsurance = budget.PaymentHealthInsurance,
                PaymentDentalInsurance = budget.PaymentDentalInsurance,
                PaymentPetInsurance = budget.PaymentPetInsurance,
                PaymentCarInsurance = budget.PaymentCarInsurance,
                PaymentBankFees = budget.PaymentBankFees,
                PaymentLoan = budget.PaymentLoan,
                PaymentCreditCard = budget.PaymentCreditCard,
                PaymentHirePurchases = budget.PaymentHirePurchases,
                PaymentInvestments = budget.PaymentInvestments,
                PaymentPension = budget.PaymentPension,
                PaymentCarFuel = budget.PaymentCarFuel,
                PaymentCarTax = budget.PaymentCarTax,
                PaymentCarMaintenance = budget.PaymentCarMaintenance,
                PaymentPublicTransport = budget.PaymentPublicTransport,
                PaymentGym = budget.PaymentGym,
                PaymentStreamingServices = budget.PaymentStreamingServices,
                PaymentHolidays = budget.PaymentHolidays,
                PaymentOther = budget.PaymentOther,
                IncomeTotal = budget.IncomeTotal,
                PaymentTotal = budget.PaymentTotal
            };


            _context.Budget.Add(newBudget);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                try
                {
                    _context.Budget.Update(newBudget);
                }
                catch
                {
                    throw;
                }
            }

            return Ok();
        }
        // GET: api/Accounts/Budgets
        [HttpGet("Budgets")]
        public async Task<ActionResult<IEnumerable<Budget>>> GetBudget()
        {
            return await _context.Budget.ToListAsync();
        }

        // POST: /api/Accounts/PasswordReset
        [HttpPost("PasswordReset")]
        public async Task<IActionResult> PasswordReset([FromBody] UserPasswordResetDto upr)
        {
            var user = await _userManager.FindByEmailAsync(upr.Email);

            if (user == null || !ModelState.IsValid)
                return BadRequest("User Error");


            string resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            IdentityResult passwordChangeResult = await _userManager.ResetPasswordAsync(user, resetToken, upr.Password);


            if (!passwordChangeResult.Succeeded)
            {
                var errors = passwordChangeResult.Errors.Select(e => e.Description);

                return BadRequest(new PasswordResponseDto { Errors = errors });
            }

            return Ok();
        }
    }
}