using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using budget_server.Data;
using budget_server;
using Microsoft.AspNetCore.Identity;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<budget_serverContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("budget_serverContext") ?? throw new InvalidOperationException("Connection string 'budget_serverContext' not found.")));
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<budget_serverContext>();
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
