import type { NextConfig } from "next";

const nextConfig: NextConfig = {

async headers(){

return[

{

source:"/(.*)",

headers:[

{
key:"Permissions-Policy",

value:
"camera=(), microphone=(), geolocation=(self)"
}

]

}

]

}

};

export default nextConfig;