import Image from "next/image";

const CasinoPage = () => {
    return (
        <div className="mt-26 mx-3">
            <h1>Casino</h1>
            <div className="grid grid-cols-4 grid-rows-[repeat(2,115px)_140px_115px] gap-3 w-full max-w-xl mx-auto mt-8">
                {/* Top left large image */}
                <div className="col-start-1 col-end-3 row-start-1 row-end-3 rounded-xl overflow-hidden">
                    <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/backend/public/2025/05/31/images/66194/Frame-1000008132-500b04e22103026183d1333b7f6a1eff.png" alt="Evolution" width={100} height={100} className="object-cover w-full h-full" />
                </div>
                {/* Top right two stacked images */}
                <div className="col-start-3 col-end-5 row-start-1 row-end-2 rounded-xl overflow-hidden ">
                    <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/backend/public/2025/05/31/images/66298/Rectangle-5793-a07759081f401f403f599d9d97bbfe8f.png" alt="Jack Hammer 4" width={300} height={151} className="object-cover w-full h-full" />
                </div>
                <div className="col-start-3 col-end-5 row-start-2 row-end-3 rounded-xl overflow-hidden ">
                    <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/backend/public/2025/05/31/images/66202/Red-Tiger-93278ea16008fc244a14bd4183568c80.png" alt="Miami Rise" width={300} height={151} className="object-cover w-full h-full" />
                </div>
                {/* Middle banner */}
                <div className="col-start-1 col-end-5 row-start-3 row-end-4 rounded-xl overflow-hidden relative flex items-center justify-center bg-blue-200">
                    <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/frontend/user/public/assets/images/my-casino-bg.png" alt="My Casino Banner" fill className="object-cover w-full h-full " />
                </div>
                {/* Bottom row: 4 small images */}
                <div className="col-start-1 col-end-2 row-start-4 row-end-5 rounded-xl overflow-hidden">
                    <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/backend/public/2025/06/03/images/67316/112-52c7f598af2250c57f20ff97e265566c.png" alt="Crazy Time" width={100} height={120} className="object-cover w-full h-full" />
                </div>
                <div className="col-start-2 col-end-3 row-start-4 row-end-5 rounded-xl overflow-hidden">
                    <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/backend/public/2025/06/01/images/66655/4-e91fb80ec2d06c7f0c12ac78eb9fcf63.png" alt="Starburst" width={100} height={120} className="object-cover w-full h-full" />
                </div>
                <div className="col-start-3 col-end-4 row-start-4 row-end-5 rounded-xl overflow-hidden">
                    <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/backend/public/2025/06/01/images/66658/3-09ec29751a79708e62981e01e1b0953d.png" alt="Pirates Plenty" width={100} height={120} className="object-cover w-full h-full" />
                </div>
                <div className="col-start-4 col-end-5 row-start-4 row-end-5 rounded-xl overflow-hidden">
                    <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/backend/public/2025/06/01/images/66657/5-8f8b73c9f13fe9e382fec5b9a2a5eb83.png" alt="77 Gaming" width={100} height={120} className="object-cover w-full h-full" />
                </div>
            </div>
        </div>
    );
};

export default CasinoPage;