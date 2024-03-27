using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using budget_server.Data;
using budget_server;
using Microsoft.AspNetCore.Identity;
using System.Reflection;
using Microsoft.AspNetCore.Hosting;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddIdentityApiEndpoints<User>()
    .AddEntityFrameworkStores<budget_serverContext>();
builder.Services.AddDbContext<budget_serverContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("budget_serverContext") ?? throw new InvalidOperationException("Connection string 'budget_serverContext' not found.")));
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddControllersWithViews();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
            builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapIdentityApi<User>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("AllowAll");

app.Run();
