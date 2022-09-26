function createButton(){
  let div = document.createElement("div");
  div.id = "stdtf-side-button"
  div.classList.add("stdtf-side-button")
  document.body.insertBefore(div, document.body.firstChild);

  let icondiv = document.createElement("div");
  icondiv.id = "stdtf-side-button-icon-container";
  icondiv.style = "display: flex; width: 100%; height: 100%; align-items: center; justify-content: center;"
  div.appendChild(icondiv);

  updateSideButtonStatus();
  
  setTimeout(function(){
      div.style.left = "0px";
  }, 100);

  let statusdiv = document.createElement("div");
  statusdiv.id = "stdtf-side-button-status"
  statusdiv.style = "background-color: #F0F0F0; border-radius: 0 13px 13px 0; width: 10px; height: 200px; position: absolute; top: 0; right: -10px; z-index: 2147483611;"
  statusdiv.addEventListener("mouseleave", function(){
    div.style.left = "-90px";
  });
  statusdiv.addEventListener("mouseover", function(){
    div.style.left = "0px";
  });
  div.appendChild(statusdiv);

  let infodiv = document.createElement("div");
  infodiv.id = "stdtf-side-button-info";
  infodiv.textContent = "Scanning website"
  div.appendChild(infodiv);

  let clickoverlay = document.createElement("div");
  clickoverlay.classList.add("stdtf-side-button-action")
  clickoverlay.onclick = function(){
      createSideBar();
      partialHideButton(div)
  }
  clickoverlay.addEventListener("mouseover", function(){
    div.style.left = "0px";
  });
  clickoverlay.addEventListener("mouseleave", function(){
    div.style.left = "-90px";
  });
  div.appendChild(clickoverlay);
}

function updateSideButtonStatus(){
  let div = document.getElementById("stdtf-side-button");
  let statussdiv = document.getElementById("stdtf-side-button-status");
  let infodiv = document.getElementById("stdtf-side-button-info");
  let iconcontainer = document.getElementById("stdtf-side-button-icon-container");

  let sidebuttonicon = document.getElementById("stdtf-side-button-icon");
  if(sidebuttonicon) sidebuttonicon.remove();

  if(div && iconcontainer) {
    let icon = document.createElement("div");
    icon.id = "stdtf-side-button-icon";

    if(laststatus == "clear"){
      icon.innerHTML = '<svg class="stdtf-sidebar-chip-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 60 60"><image x="4" width="54" height="54" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAFe0lEQVRogc2b64tWVRTGf/OOk6OlDkVRdNPMNBqKNImkOzENo1YkdCEo6EsEAwZCqARKUJRaWCiROqal3Si1P6AJ6lMS+MVMDTUraCqirMlp0mliDetMx93a5z33cx7YH845e6+9nr32Xvu2TgvFYhYwD5gNzAHOBzqAc4BR4E/gV+An4CBwCPgCOFqwXrmhDbgH2A58p6TSpGNAH7AQmFBHotOB9cDPGUj60gCwDri0BjzHuqxY81QBRN00DGzRxk2NtGN4ErACeBqY2CSvNMYB4Eu1lqQTKqMduAC4WMd5Z4wuPAQ8p1YfzkI+Lm4Avm5iDSH4AnBLjAYJYzJwm5I5GqOO64okKr1hqbaqpYBYcgdwc451CvldwGlPnWLtJ3KsbxytwCZPpSPATh3PRUG6+0cR1n4VaORVd7u2slXRYeDWAom6uAv4xqPLO8BZWStojSDbp46nbEwD3o4gndrSLZ5uLGP1yQqIulgO/OPp3qmw1BD2N7CkBmQDPOxZAyR2ZPMNbyye8r7CVE+PR9Vxut479pQ1yTPP9taQbIBlnnk6lhN71ij8eilqZ8P7ht4rm0mUufQvp5Bs286uOVnBFGN1JtvPy6MKbXcKiBdcUJ7OmdFjWHmTT+gM9cLhzDtqRkgaf4/OwzM9eT40dlmXWBlfMaagy4rVPxG61fsG+u3zFL7G8Npr3Uxtxub9rfpw/R/ZYJr0rao+cPL+4G477zX6/rxyuDSFRTZYRvpwh5G/O5zXdVYHak72Y907+yCWP+6U2RzO+63zcVUl9M5EWrIB1jjljgQfZhlC55fHy0SXh+ynesQbB3cb5cfOwx4yJuu2CslmtWwAyevuB5Y09DQhjH26A6kCQna3HjqE0Q8sBk4m0EnyHnLezbEIH6Ea5Ek2gEt4thC+0Hl5rAK6RZAVuFc2FzV00R3GLymFp0WXh+xnuj5IS1Zwwnme0jC8XimH24ouPY20yMpGYDCj/D+c56nW0mwkhqBFuhX7Hng8pTLdHrL9+i0rWcGo8zx207LXcd1PNRHS0OvNcJllCRXJa+pphpWO/L0NoyXPbSJEWmmq825dAtI+B/VJRgdlocN593tDL7fCMPeOIYzovZGLOKSjyC7KmazgCud5jOsqx+yfxxDUoue/bpeMOkfKY7mYFPudup7BWFoOxrx1F9IbPKRdS/vGbH/OYzYMa2n5gHy/0lDkpphC41i6Csvi2TzMCD66e8fVCQRHWXpLBZYN4G4Pz1hBbnMU2p9QeBTpKsg2jFvGvnCGxYZiNyasJA7pMsgKbjfq7glnaDMWE9tSVBRFuiyyGFe8A5YjXu9kOhVx9hsFIb2xQrKdxjHtS1bG6cZB/JspKw3iQYToiyWSRQ/qwxyGo87X33Ayy1XLnSUqmxXdxlDaHCVzpjGNHCzZQmnRoVNPWPeTcQLZVhuttLO2NP+De6c0vpRshnaNznEL1yGuw4flhr7SM2MHxV1rdG3xfA+WTqU5HjGCW+SOe25SQb1Gq4nHu78CUj485glqSd0bXzOEjdQg3qMlImxpYxbBDU/sxKi+n5Yfh9iQ05Z3PTrt1mC6TJho3LcG6XDJ8/RCY+oJGyBJ5G4kWj3dO0jvFRxc2mmsoMJpQ57BpWH0GlE+QTqtXW1BhsDzMBq669llrI2DNFTGdDlX72x8rT2q91PPa3dPEoA6WU9I1hiHEtY8e31S5dNaol3D/1cYJ5AuZCr7Ssf7cb3KGdS65ZrnPF3+XaW/+jS7qh3Sxlxb8i3JGOQYdKuxyyoi5fKTR16QaLeXgR8LIDqgsusUQjWOCXqgvjUicj1OCn7U6sn7R62if8WTLi9/wcj4vFp/2Ql+xRPIWP5Ne4Y4IRnnxf2KB/wL4CYurDRHgeUAAAAASUVORK5CYII="/></svg>'

      if(infodiv) infodiv.textContent = "No Issues Found - Click for more info";
      if(statussdiv) statussdiv.style.backgroundColor = "#44C13E";
    }
    else if(laststatus == "caution"){
      icon.innerHTML = '<svg class="stdtf-sidebar-chip-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 60 60"><image x="4" width="54" height="54" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAE0klEQVR4nO3dyYsdRRzA8a8zmUQN8aCHiFFjMG4XZ4jLVQUVF/DP8are3CMexMTtoiYacUcFLwoiHlTEQRPjEgVXNBcVQdCJlNRPmrKq39bV9ft11xeaQL/HdL3+0P2mJ/3qYbirgP3AZ8DvfjkMPARcbvmFWWsH8CZwomXZAA4A28a+s3K3B/hpAkZzWQfOHPYuKdca8MsMGLK4U9pZY91puUphvApcC5zhT083AO9Fnne4HindtZrAuCOxhc3AoYqSp0uBnyM7964JW1sGnqqnr26bF0OqKB12CfBDZGfePeMmKkoHXdwRhlRRFiiFcc+CP7eizFEuDKmizNBFwPeRnXVvx9upKFOUwrgv0/YqSkt9Y0gVJZLD+C6yU+7vafsVpdGFhTGkitKCsbfQeEaNcoEyDGmUKA7jW4UY0qhQUhgPACcpGJ80CpQUxj5lGNKgUXYbw5AGiXIecCzyovYrx5AGhbLTOIY0CJShYEimURzGV5HBPwIsKRjfvJlEOTeB8ahxDMkUyi7g655/m9oO/BrZ5pFM23NtsnCLUerIeCzzkbEW2aYsOVN9pDiMLwtgUBAErSjnFMSgMAjaUBzGF5HBPN7jG3hpELSgpDCe6Pm3KQ0glEbRgoEiEEqhnJ3AOOAH1HeaQOgbxWF8rggDhSD0hZLCOOgvlEqlEYTcKO7q81OFGCgGIRfK9gTGMwowUA5C1ygO4xPFGBgAoSuUFMazijAwAsKiKFYwMATCvCgpjEMKMTAGwqwo2/ysB5rfM8KsgdDy/ynr4TQgB41hYBSEFpSn5QlX+slatL9nhFkFIYHiDC5zDz4cPPCBnw1Be5ZBXCvAu8G4H3QPHA1W3lx+rFNlHQQ/T0tz3B+7lX8EK7eWH+dUDQFkazDu40uRu0IsvSDrnRyMf2PJf4Cm2RVj30s9dn2wqW8cyFvBylsH97J15q47bg9G5qYu5OrIOTg1F5WmLL+HuFPVG8GY//KT7vxbbFLJUE9bVkEcxuuRMe9rPmlHYnJJzSgWQVIYHwKnhk9OzWt4Z5mxT8waiLvYfiUy1iNtf/F107AeN3KkrCYwNhSMLcwdGa9Fxvq/m7TDv1e5Q+c6/55yemP9bf5fTTBH/Zwo4WTJxwqNJ9UW4HngxuBxd2RcA/w4zQ+xdvrSmjtNvTzraSpVRVmsTjGkijJfWTCkijJbWTGkijJdDuOl3BhSRWmvVwxJ03XKacDbwPvB4j4acUrPY9nivxhg4nVGjrSgtF2pr/Y4jqIYkobTVxvIWk9jKHKaSlUapTSIKgypJEpJEJUYUimUUiCqMaQSb/TnR27wO+HX7cy0zdRFn8pv7ymBssvf7ddcdmfalikMaagXjw7jRe2nqVRDQzGNIQ0FZRAYknUUh/HCUDAkqygrQ8SQrKEMGkOygjIKDEk7yqgwJK0oo8SQtKGMGkPSglIxGpVGWfF3FFaMRqVQKkZLfaNUjCnqC2XZT0tYMaYoN0rFmKNcKBVjgbpGqRgd1BXKsp9lp2J00KIoFSND86JUjIyl7mZJTW6w2cK34FgvhfKcv/1nk59Z5xb/wdWK0UOp09ekpZ6mMrYnMeNEalmvR0b+3PdevTMB4m//3YlWJmMbRDcBT/qv6/sT+A34yE8m8N+sOqYC/gHt0wIb+yg2FgAAAABJRU5ErkJggg=="/></svg>'

      if(infodiv) infodiv.textContent = "This site may be a scam - Click for more info";
      if(statussdiv) statussdiv.style.backgroundColor = "#FCE148";
    }
    else if(laststatus == "warning"){
      icon.innerHTML = '<svg class="stdtf-sidebar-chip-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 60 60"><image x="4" width="54" height="54" xlink:href="data:img/png;base64,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"/></svg>'

      if(infodiv) infodiv.textContent = "This site is a scam - Click for more info";
      if(statussdiv) statussdiv.style.backgroundColor = "#DD3333";
    }
    else if(laststatus == "userreported"){
      icon.innerHTML = '<svg class="stdtf-sidebar-chip-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 60 60"><image x="4" width="54" height="54" xlink:href="data:img/png;base64,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"/></svg>'

      if(infodiv) infodiv.textContent = "This site has user reports - Click for more info";
      if(statussdiv) statussdiv.style.backgroundColor = "#FCE148";
    }
    else if(laststatus == "warningpattern"){
      icon.innerHTML = '<svg class="stdtf-sidebar-chip-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 60 60"><image x="4" width="54" height="54" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAE0klEQVR4nO3dyYsdRRzA8a8zmUQN8aCHiFFjMG4XZ4jLVQUVF/DP8are3CMexMTtoiYacUcFLwoiHlTEQRPjEgVXNBcVQdCJlNRPmrKq39bV9ft11xeaQL/HdL3+0P2mJ/3qYbirgP3AZ8DvfjkMPARcbvmFWWsH8CZwomXZAA4A28a+s3K3B/hpAkZzWQfOHPYuKdca8MsMGLK4U9pZY91puUphvApcC5zhT083AO9Fnne4HindtZrAuCOxhc3AoYqSp0uBnyM7964JW1sGnqqnr26bF0OqKB12CfBDZGfePeMmKkoHXdwRhlRRFiiFcc+CP7eizFEuDKmizNBFwPeRnXVvx9upKFOUwrgv0/YqSkt9Y0gVJZLD+C6yU+7vafsVpdGFhTGkitKCsbfQeEaNcoEyDGmUKA7jW4UY0qhQUhgPACcpGJ80CpQUxj5lGNKgUXYbw5AGiXIecCzyovYrx5AGhbLTOIY0CJShYEimURzGV5HBPwIsKRjfvJlEOTeB8ahxDMkUyi7g655/m9oO/BrZ5pFM23NtsnCLUerIeCzzkbEW2aYsOVN9pDiMLwtgUBAErSjnFMSgMAjaUBzGF5HBPN7jG3hpELSgpDCe6Pm3KQ0glEbRgoEiEEqhnJ3AOOAH1HeaQOgbxWF8rggDhSD0hZLCOOgvlEqlEYTcKO7q81OFGCgGIRfK9gTGMwowUA5C1ygO4xPFGBgAoSuUFMazijAwAsKiKFYwMATCvCgpjEMKMTAGwqwo2/ysB5rfM8KsgdDy/ynr4TQgB41hYBSEFpSn5QlX+slatL9nhFkFIYHiDC5zDz4cPPCBnw1Be5ZBXCvAu8G4H3QPHA1W3lx+rFNlHQQ/T0tz3B+7lX8EK7eWH+dUDQFkazDu40uRu0IsvSDrnRyMf2PJf4Cm2RVj30s9dn2wqW8cyFvBylsH97J15q47bg9G5qYu5OrIOTg1F5WmLL+HuFPVG8GY//KT7vxbbFLJUE9bVkEcxuuRMe9rPmlHYnJJzSgWQVIYHwKnhk9OzWt4Z5mxT8waiLvYfiUy1iNtf/F107AeN3KkrCYwNhSMLcwdGa9Fxvq/m7TDv1e5Q+c6/55yemP9bf5fTTBH/Zwo4WTJxwqNJ9UW4HngxuBxd2RcA/w4zQ+xdvrSmjtNvTzraSpVRVmsTjGkijJfWTCkijJbWTGkijJdDuOl3BhSRWmvVwxJ03XKacDbwPvB4j4acUrPY9nivxhg4nVGjrSgtF2pr/Y4jqIYkobTVxvIWk9jKHKaSlUapTSIKgypJEpJEJUYUimUUiCqMaQSb/TnR27wO+HX7cy0zdRFn8pv7ymBssvf7ddcdmfalikMaagXjw7jRe2nqVRDQzGNIQ0FZRAYknUUh/HCUDAkqygrQ8SQrKEMGkOygjIKDEk7yqgwJK0oo8SQtKGMGkPSglIxGpVGWfF3FFaMRqVQKkZLfaNUjCnqC2XZT0tYMaYoN0rFmKNcKBVjgbpGqRgd1BXKsp9lp2J00KIoFSND86JUjIyl7mZJTW6w2cK34FgvhfKcv/1nk59Z5xb/wdWK0UOp09ekpZ6mMrYnMeNEalmvR0b+3PdevTMB4m//3YlWJmMbRDcBT/qv6/sT+A34yE8m8N+sOqYC/gHt0wIb+yg2FgAAAABJRU5ErkJggg=="/></svg>'

      if(infodiv) infodiv.textContent = "This site has warnings - Click for more info";
      if(statussdiv) statussdiv.style.backgroundColor = "#FCE148";
    }
    else if(laststatus == "error"){
      icon.innerHTML = '<svg class="stdtf-sidebar-chip-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 60 60"><image x="4" width="54" height="54" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAE0klEQVR4nO3dyYsdRRzA8a8zmUQN8aCHiFFjMG4XZ4jLVQUVF/DP8are3CMexMTtoiYacUcFLwoiHlTEQRPjEgVXNBcVQdCJlNRPmrKq39bV9ft11xeaQL/HdL3+0P2mJ/3qYbirgP3AZ8DvfjkMPARcbvmFWWsH8CZwomXZAA4A28a+s3K3B/hpAkZzWQfOHPYuKdca8MsMGLK4U9pZY91puUphvApcC5zhT083AO9Fnne4HindtZrAuCOxhc3AoYqSp0uBnyM7964JW1sGnqqnr26bF0OqKB12CfBDZGfePeMmKkoHXdwRhlRRFiiFcc+CP7eizFEuDKmizNBFwPeRnXVvx9upKFOUwrgv0/YqSkt9Y0gVJZLD+C6yU+7vafsVpdGFhTGkitKCsbfQeEaNcoEyDGmUKA7jW4UY0qhQUhgPACcpGJ80CpQUxj5lGNKgUXYbw5AGiXIecCzyovYrx5AGhbLTOIY0CJShYEimURzGV5HBPwIsKRjfvJlEOTeB8ahxDMkUyi7g655/m9oO/BrZ5pFM23NtsnCLUerIeCzzkbEW2aYsOVN9pDiMLwtgUBAErSjnFMSgMAjaUBzGF5HBPN7jG3hpELSgpDCe6Pm3KQ0glEbRgoEiEEqhnJ3AOOAH1HeaQOgbxWF8rggDhSD0hZLCOOgvlEqlEYTcKO7q81OFGCgGIRfK9gTGMwowUA5C1ygO4xPFGBgAoSuUFMazijAwAsKiKFYwMATCvCgpjEMKMTAGwqwo2/ysB5rfM8KsgdDy/ynr4TQgB41hYBSEFpSn5QlX+slatL9nhFkFIYHiDC5zDz4cPPCBnw1Be5ZBXCvAu8G4H3QPHA1W3lx+rFNlHQQ/T0tz3B+7lX8EK7eWH+dUDQFkazDu40uRu0IsvSDrnRyMf2PJf4Cm2RVj30s9dn2wqW8cyFvBylsH97J15q47bg9G5qYu5OrIOTg1F5WmLL+HuFPVG8GY//KT7vxbbFLJUE9bVkEcxuuRMe9rPmlHYnJJzSgWQVIYHwKnhk9OzWt4Z5mxT8waiLvYfiUy1iNtf/F107AeN3KkrCYwNhSMLcwdGa9Fxvq/m7TDv1e5Q+c6/55yemP9bf5fTTBH/Zwo4WTJxwqNJ9UW4HngxuBxd2RcA/w4zQ+xdvrSmjtNvTzraSpVRVmsTjGkijJfWTCkijJbWTGkijJdDuOl3BhSRWmvVwxJ03XKacDbwPvB4j4acUrPY9nivxhg4nVGjrSgtF2pr/Y4jqIYkobTVxvIWk9jKHKaSlUapTSIKgypJEpJEJUYUimUUiCqMaQSb/TnR27wO+HX7cy0zdRFn8pv7ymBssvf7ddcdmfalikMaagXjw7jRe2nqVRDQzGNIQ0FZRAYknUUh/HCUDAkqygrQ8SQrKEMGkOygjIKDEk7yqgwJK0oo8SQtKGMGkPSglIxGpVGWfF3FFaMRqVQKkZLfaNUjCnqC2XZT0tYMaYoN0rFmKNcKBVjgbpGqRgd1BXKsp9lp2J00KIoFSND86JUjIyl7mZJTW6w2cK34FgvhfKcv/1nk59Z5xb/wdWK0UOp09ekpZ6mMrYnMeNEalmvR0b+3PdevTMB4m//3YlWJmMbRDcBT/qv6/sT+A34yE8m8N+sOqYC/gHt0wIb+yg2FgAAAABJRU5ErkJggg=="/></svg>'

      if(infodiv) infodiv.textContent = "We had some issues - Click for more info";
      if(statussdiv) statussdiv.style.backgroundColor = "#FCE148";
    }
    else{
      icon.innerHTML = '<div class="stdtf-flake stdtf-flake-three"></div><div class="stdtf-flake stdtf-flake-one"></div><div class="stdtf-flake stdtf-flake-two"></div>'

      if(infodiv) infodiv.textContent = "Scanning Website";
      if(statussdiv) statussdiv.style.backgroundColor = "#F0F0F0";
    }

    iconcontainer.appendChild(icon);
  }
}

function partialHideButton(){
  let div = document.getElementById("stdtf-side-button");
  
  if(div && div.style.left == "0px"){
      div.style.left = "-90px";
  } else if(div && div.style.left != "0px"){
    if(div.style.left != "-90px"){
      setTimeout(() => {
        partialHideButton();
      }, 100);
    }
  }
}

function destroyButton(){
  let div = document.getElementById("stdtf-side-button");
  if(div){
      div.style.left = "-100px";

      setTimeout(function(){
          div.remove();
      }, 350);
  }
}