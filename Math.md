# Box muller [[1]](#1)
Given two random numbers from the uniform distribution: $U_0$ and $U_1$, which belong to the interval $(0,1)$, then $Z_0$ and $Z_1$ following the normal distribution can be calculated by

$$Z0=\sqrt{-2*\ln(U_0)} * \cos(2*\pi*U_1)$$

$$Z1=\sqrt{-2*\ln(U_0)} * \sin(2*\pi*U_1)$$

If we use the Aptos Randomness API to create random numbers in the range $(0,r)$, for example $u_0$ and $u_1$, then:

$$U_0=\frac{u_0}{r}$$

$$U_1=\frac{u_1}{r}$$

$$Z0=\sqrt{\ln(\frac{r^2}{U_0^2})} * cos(2*\pi*\frac{u_1}{r})$$

$$Z1=\sqrt{\ln(\frac{r^2}{U_0^2})} * sin(2*\pi*\frac{u_1}{r})$$

# Exponential distribution - inverse CDF
The cumulative distribution function (CDF) of the exponential distribution is given by:

$$F(x)=1-e^{-\lambda x}$$

Where:
- $F(x)$ is the cumulative probability up to $x$
- $\lambda$ is the rate parameter of the exponential distribution.


To transform from a uniform distribution to an exponential distribution, you need to find the inverse of the CDF of the exponential distribution. This involves solving for $x$ interm of $F(x)$:

$$F(x)=1-e^{-\lambda x}$$

$$e^{-\lambda x}= 1 - F(x)$$

$$-\lambda x=\ln(1-F(x))$$

$$x=-\frac{1}{\lambda}*\ln(1-F(x))$$

If we use the Aptos Randomness API to create random numbers in the range $[0,r]$, for example $U$, then:

$$x=-\frac{1}{\lambda}*\ln(1- \frac{U}{r})$$

 
# Laplacian distribution - inverse CDF
The CDF of the Laplacian distribution is given by:
$$F(x)=\frac{1}{2} * exp({\frac{-|x-\mu|}{\beta}})$$

The inverse CDF (quantile function) can be derived by solving for $x$ in terms of $F(x)$. This gives you the transformation function.

$$x=\mu - \beta * sgn(F(x) - 0.5) * \ln(1-2*|F(x)-0.5|)$$

If we use the Aptos Randomness API to create random numbers in the range $[0,r]$, for example $U$, then:

$$x=\mu - \beta * sgn(\frac{U}{r} - 0.5) * \ln(1-2*|\frac{U}{r}-0.5|)$$

# Monte Carlo simulation
The concept of Monte Carlo simulation is quite simple. It involves obtaining the return process of the asset and discretizing it, then using small time intervals to calculate the changes in asset prices.

For example, considering token prices, their returns follow a Geometric Brownian motion. A discretized stochastic differential equation [[2]](#2):

$$\partial S_t = \mu * S_t * \partial t + \sigma * S_t * \partial W_t$$

where $W_t$ represents a Wiener process.

After applying Ito's formula [[3]](#3), we obtain Equation 2 as the main equation for Monte Carlo simulation to predict token prices [[4]](#4)[[5]](#5)[[6]](#6). Where $Z_t$ follows a standard normal distribution.

$$S_t = S_{t-1} * exp( (\mu - 0.5 * \sigma^2) * \partial t + \sigma * \sqrt{dt} * Z_t )$$

We need to tranform all random numbers of uniform distribution to random numbers of normal distribution to get $Z_t$. Box-muller method supports that.

If $T$ is the time to maturity and the number of price steps is $n$ (where $n$ is big enough), then:

$$\partial{t} \sim \frac{T}{n}$$ 

With historical price data, we can calculate $\mu$ and $\sigma$ from the client side as follows:

$$hourlyDailyReturn=\log(cp_i) - \log(cp_{i+1})$$

$$\mu=\sum_{i=0}^{k-1}(\frac{hourlyDailyReturn}{k})$$

$$\sigma=\sqrt{\sum_{i=0}^{k-1}\frac{(hourlyDailyReturn - \mu)^2}{k}}$$

Where $\mu$ is the average of daily or hourly return, $cp_i$ is the closed price at index $i$, and $\sigma$ is standard deviation.

# Other formulas
## Maclaurin series

$$\cos(x) = \sum_{i=0}^{n} (\frac{-1^i}{2i!} * x^{2i} )$$

Where $n$ is the number of replicates to approximate $cos(x)$ and $x$ is a variable in radians.

We can calculate $\sin(x)$ by this formula: $\sin(x) = \cos(\frac{\pi}{2} - x)$

## Bailey-Borwein-Plouffe formula [[7]](#7)

$$\pi = \sum_{i=0}^{k}\frac{1}{16^i} * ( \frac{4}{8i + 1} - \frac{2}{8i + 4} - \frac{1}{8i + 5}  - \frac{1}{8i + 6} )$$


## Natural logarithm
If we use $\ln(x << 64)$, then the returned result is:

$$\ln(x * 2^{64})=\ln(x) + \ln(2^{64})=\ln(x) + 64*\ln(2)$$

After using math_fixed64, we call the result $lnFixed64$. Then, we have this equation:

$$lnFixed64= (\ln(x) - 64*\ln(2)) * 2^{64}= \ln(x) * 2^{64} + 64*LN2$$

$$\ln(x) * 2^{64} = lnFixed64 - 64*LN2$$

Where $LN2$ is a constant value representing $\ln(2) \times 2^{64}$.

This value will be converted into the FixedPoint64WithSign struct.

$$signedValue=\{ value: |\ln(x) * 2^{64}|, positive: sgn(\ln(x)) \}$$

This result can be achieved by using [math_fixed64_with_sign](contracts/ramstack/sources/math_fixed64_with_sign.move) without modification.

## References
<a id="1">[1]</a> 
Box, G. E. P., and Mervin E. Muller. “A Note on the Generation of Random Normal Deviates.” *The Annals of Mathematical Statistics* 29, no. 2 (June 1958): 610–11. https://doi.org/10.1214/aoms/1177706645.

<a id="2">[2]</a> 
Black, Fischer, and Myron Scholes. “The Pricing of Options and Corporate Liabilities.” *Journal of Political Economy* 81, no. 3 (1973): 637–54.

<a id="3">[3]</a> 
Itô, Kiyosi. “On a Formula Concerning Stochastic Differentials.” *Nagoya Mathematical Journal* 3, no. none (January 1951): 55–65.

<a id="4">[4]</a> 
Harrison, Robert L. “Introduction To Monte Carlo Simulation.” *AIP Conference Proceedings* 1204 (January 5, 2010): 17–21. https://doi.org/10.1063/1.3295638.

<a id="5">[5]</a> 
Gentle, James E., ed. “Monte Carlo Methods.” In *Random Number Generation and Monte Carlo Methods*, 229–81. New York, NY: Springer, 2003. https://doi.org/10.1007/0-387-21610-3_7.

<a id="6">[6]</a> 
Fu, Michael, Scott Laprise, Dilip Madan, Yi Su, and Rongwen Wu. “Pricing American Options: A Comparison of Monte Carlo Simulation Approaches.” *The Journal of Computational Finance* 4, no. 3 (2001): 39–88. https://doi.org/10.21314/JCF.2001.066.

<a id="7">[7]</a>
Bailey, David, Peter Borwein, and Simon Plouffe. “On the Rapid Computation of Various Polylogarithmic Constants.” *Mathematics of Computation* 66, no. 218 (1997): 903–13. https://doi.org/10.1090/S0025-5718-97-00856-9.