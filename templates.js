export const urlSaveForm = `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>URL Shortener</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
</head>
<body>
    <section class="w-full px-8 text-gray-700 bg-white body-font">
        <div class="container flex flex-col items-center justify-between py-5 mx-auto max-w-7xl md:flex-row">
            <a href="https://materialize.com" class="inline-block font-sans text-2xl font-extrabold text-left text-black no-underline bg-transparent cursor-pointer focus:no-underline">
                <svg class="w-10 h-10 text-black fill-current" viewBox="0 0 39 15" xmlns="http://www.w3.org/2000/svg"><path d="M11.252 1.152C4.184 2.526.454 6.918.061 14.329c1.963-4.049 4.798-5.975 8.503-5.778 2.115.112 3.84 1.295 5.75 2.603 3.11 2.133 6.712 4.601 13.281 3.324 7.068-1.374 10.798-5.766 11.191-13.177-1.963 4.049-4.798 5.975-8.503 5.779-2.115-.113-3.84-1.296-5.75-2.604-3.11-2.133-6.712-4.601-13.281-3.324z" fill-rule="evenodd"></path></svg>
            </a>
            <div class="inline-flex items-center ml-5 space-x-6 lg:w-2/5 lg:justify-end lg:ml-0">
                <a href="https://materialize.com" class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-purple-600 border border-transparent shadow-sm rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700">
                    Materialize
                </a>
            </div>
        </div>
    </section>

    <section class="pt-20 bg-white">

        <div class="px-10 mx-auto max-w-7xl xl:px-5">

            <form class="flex flex-col justify-center space-y-8 md:space-y-12" action="/admin/store" method="POST">

                <h2 class="max-w-4xl mx-auto text-6xl font-extrabold leading-none text-left text-gray-900 sm:text-7xl md:text-8xl md:text-center">URL shortener</h2>
                <p class="max-w-4xl mx-auto text-xl text-left text-gray-500 md:text-2xl md:text-center">Create a new short URL via the form bellow.</p>

                <div class="flex flex-col w-full max-w-4xl mx-auto space-y-5 md:space-y-0 md:space-x-5 md:flex-row">
                    <input type="text" name="longUrl" class="flex-1 w-full px-5 py-5 text-2xl border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 focus:outline-none" placeholder="Long URL" required>
                </div>
                <div class="flex flex-col w-full max-w-4xl mx-auto space-y-5 md:space-y-0 md:space-x-5 md:flex-row">
                    <input type="text" name="shortCode" class="flex-1 w-full px-5 py-5 text-2xl border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 focus:outline-none" placeholder="Short Code" required>
                </div>
                <div class="flex flex-col w-full max-w-4xl mx-auto space-y-5 md:space-y-0 md:space-x-5 md:flex-row">
                    <button class="flex-1 w-full px-10 py-5 text-2xl font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 focus:ring-offset-2 focus:outline-none">Generate</button>
                </div>

                <div class="w-full pt-5 mx-auto max-w-7xl">
                    <div class="overflow-hidden border border-gray-300 rounded-t-xl">
                        <div class="h-12 flex items-center pl-3.5 justify-start border-b border-gray-300 w-full">
                            <div class="flex space-x-1.5">
                                <div class="w-3 h-3 bg-gray-200 rounded-full"></div>
                                <div class="w-3 h-3 bg-gray-200 rounded-full"></div>
                                <div class="w-3 h-3 bg-gray-200 rounded-full"></div>
                            </div>
                        </div>
                        <div class="box-content w-full bg-gray-100 h-96 overflow-auto">
                            <table id="table" class="w-full text-left text-sm">
                                <thead>
                                    <tr>
                                        <th class="px-5 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                            Short Code
                                        </th>
                                        <th class="px-5 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                            Long URL
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </form>
        </div>
    </section>


    <section class="py-10 bg-black">
        <div class="px-10 mx-auto max-w-7xl">
            <div class="flex flex-col items-center md:flex-row md:justify-between">
                <a href="#_" class="flex items-center justify-center w-10 h-10 mr-3 rounded-lg mb-7 bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-500 rounded-xxl">
                    <svg class="w-5 h-5 text-white fill-current" viewBox="0 0 39 15" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.252 1.152C4.184 2.526.454 6.918.061 14.329c1.963-4.049 4.798-5.975 8.503-5.778 2.115.112 3.84 1.295 5.75 2.603 3.11 2.133 6.712 4.601 13.281 3.324 7.068-1.374 10.798-5.766 11.191-13.177-1.963 4.049-4.798 5.975-8.503 5.779-2.115-.113-3.84-1.296-5.75-2.604-3.11-2.133-6.712-4.601-13.281-3.324z" fill-rule="evenodd"></path>
                    </svg>
                </a>
            <div class="flex flex-col justify-between text-center md:flex-row">
                <p class="order-last text-sm leading-tight text-gray-500 md:order-first"> Crafted with <a href="https://devdojo.com/tails" class="text-white">Tails</a>.</p>
            </div>
            <div class="flex flex-col justify-between text-center md:flex-row">
                <ul class="flex flex-row justify-center pb-3 -ml-4 -mr-4 text-sm">
                    <li> <a href="https://materialize.com" class="px-4 text-gray-500 hover:text-white">Materialize</a> </li>
                    <li> <a href="https://upstash.com" class="px-4 text-gray-500 hover:text-white">Upstash</a> </li>
                    <li> <a href="https://github.com/bobbyiliev/cf-url-shortener" class="px-4 text-gray-500 hover:text-white">Demo</a> </li>
                </ul>
            </div>
        </div>
    </section>
    <script>
        // Fetch the latest data from the API /admin/urls
        fetch('/admin/urls')
            .then(response => response.json())
            .then(data => {
                let table = document.getElementById('table');
                let tbody = table.getElementsByTagName('tbody')[0];
                tbody.innerHTML = '';
                data.forEach(url => {
                    let row = document.createElement('tr');
                    let longUrl = document.createElement('td');
                    let shortCode = document.createElement('td');
                    // Set classes
                    longUrl.classList.add('px-5', 'py-3', 'border-b', 'border-gray-200', 'bg-gray-50', 'text-left', 'text-xs', 'leading-4', 'font-medium', 'text-gray-500', 'tracking-wider');
                    shortCode.classList.add('px-5', 'py-3', 'border-b', 'border-gray-200', 'bg-gray-50', 'text-left', 'text-xs', 'leading-4', 'font-medium', 'text-gray-500', 'tracking-wider');
                    longUrl.innerHTML = url.key;
                    shortCode.innerHTML = url.value;
                    row.appendChild(longUrl);
                    row.appendChild(shortCode);
                    tbody.appendChild(row);
                });
            });
    </script>
</body>
</html>
`;

export const homePage = `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>URL Shortener</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
</head>
<body>
    <section class="w-full px-8 text-gray-700 bg-white body-font">
        <div class="container flex flex-col items-center justify-between py-5 mx-auto max-w-7xl md:flex-row">
            <a href="https://materialize.com" class="inline-block font-sans text-2xl font-extrabold text-left text-black no-underline bg-transparent cursor-pointer focus:no-underline">
                <svg class="w-10 h-10 text-black fill-current" viewBox="0 0 39 15" xmlns="http://www.w3.org/2000/svg"><path d="M11.252 1.152C4.184 2.526.454 6.918.061 14.329c1.963-4.049 4.798-5.975 8.503-5.778 2.115.112 3.84 1.295 5.75 2.603 3.11 2.133 6.712 4.601 13.281 3.324 7.068-1.374 10.798-5.766 11.191-13.177-1.963 4.049-4.798 5.975-8.503 5.779-2.115-.113-3.84-1.296-5.75-2.604-3.11-2.133-6.712-4.601-13.281-3.324z" fill-rule="evenodd"></path></svg>
            </a>
            <div class="inline-flex items-center ml-5 space-x-6 lg:w-2/5 lg:justify-end lg:ml-0">
                <a href="https://materialize.com" class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-purple-600 border border-transparent shadow-sm rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700">
                    Materialize
                </a>
            </div>
        </div>
    </section>
    <section class="px-2 pt-32 bg-white md:px-0">
        <div class="container items-center max-w-6xl px-5 mx-auto space-y-6 text-center">
            <h1 class="text-4xl font-extrabold tracking-tight text-left text-gray-900 sm:text-5xl md:text-6xl md:text-center">
                <span class="block">Simple URL <span class="block mt-1 text-purple-500 lg:inline lg:mt-0">Shortener</span></span>
            </h1>
            <p class="w-full mx-auto text-base text-left text-gray-500 md:max-w-md sm:text-lg lg:text-2xl md:max-w-3xl md:text-center">
                Using Upstash, Materialize and Cloudflare Workers
            </p>
            <div class="relative flex flex-col justify-center md:flex-row md:space-x-4">
                <a href="https://materialize.com/cloud" class="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-purple-500 rounded-md md:mb-0 hover:bg-purple-700 md:w-auto">
                    Try It Free
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
                <a href="https://materialize.com/docs" class="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
                    Learn More
                </a>
            </div>
        </div>
        <div class="container items-center max-w-4xl px-5 mx-auto mt-16 text-center">
            <img src="https://cdn.devdojo.com/images/november2020/hero-image.png">
        </div>
    </section>
    <section class="py-10 bg-black">
        <div class="px-10 mx-auto max-w-7xl">
            <div class="flex flex-col items-center md:flex-row md:justify-between">
                <a href="#_" class="flex items-center justify-center w-10 h-10 mr-3 rounded-lg mb-7 bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-500 rounded-xxl">
                    <svg class="w-5 h-5 text-white fill-current" viewBox="0 0 39 15" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.252 1.152C4.184 2.526.454 6.918.061 14.329c1.963-4.049 4.798-5.975 8.503-5.778 2.115.112 3.84 1.295 5.75 2.603 3.11 2.133 6.712 4.601 13.281 3.324 7.068-1.374 10.798-5.766 11.191-13.177-1.963 4.049-4.798 5.975-8.503 5.779-2.115-.113-3.84-1.296-5.75-2.604-3.11-2.133-6.712-4.601-13.281-3.324z" fill-rule="evenodd"></path>
                    </svg>
                </a>
            <div class="flex flex-col justify-between text-center md:flex-row">
                <p class="order-last text-sm leading-tight text-gray-500 md:order-first"> Crafted with <a href="https://devdojo.com/tails" class="text-white">Tails</a>.</p>
            </div>
            <div class="flex flex-col justify-between text-center md:flex-row">
                <ul class="flex flex-row justify-center pb-3 -ml-4 -mr-4 text-sm">
                    <li> <a href="https://materialize.com" class="px-4 text-gray-500 hover:text-white">Materialize</a> </li>
                    <li> <a href="https://upstash.com" class="px-4 text-gray-500 hover:text-white">Upstash</a> </li>
                    <li> <a href="https://github.com/bobbyiliev/cf-url-shortener" class="px-4 text-gray-500 hover:text-white">Demo</a> </li>
                </ul>
            </div>
        </div>
    </section>
</body>
</html>
`
