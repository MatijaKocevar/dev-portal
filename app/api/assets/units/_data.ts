export type Unit = {
    id: string;
    name: string;
    type: string;
    function: string;
    energySupplier: string;
    marketParticipant: string;
    aggregator: string;
    offeredServices: string[];
    offeredProducts: { name: string; active: boolean }[];
    owner: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
    latitude: string;
    longitude: string;
    coordinates: { lat: number; lng: number };
    available: boolean;
    grid: boolean;
    gridDetails: {
        maxImport: string;
        maxExport: string;
        phaseACurrent: string;
        phaseBCurrent: string;
        phaseCCurrent: string;
    };
    pv: boolean;
    pvDetails?: {
        peakPower: string;
        maxExport: string;
    };
    battery: boolean;
    batteryDetails?: {
        totalCapacity: string;
        maxImport: string;
        maxExport: string;
    };
    hvac: boolean;
    evse: boolean;
    evseDetails?: {
        maxImportPower: string;
    };
    flexUpMw: number;
    flexDownMw: number;
    dso: string;
    tso: string;
    measurementPlaceNo: string;
    gsrn: string;
    meterNo: string;
    alerts: string;
    highestAlertImpact: string;
    installationDate: string;
    lastUpdateTime: string;
    deactivatedTime: string;
    rampUpTime: string;
    rampDownTime: string;
    responseDelayTime: string;
    regulationType: string;
    siteId: string;
};

export const unitsData = (): Unit[] => [
    {
        id: "1",
        name: "ENSET",
        type: "Unit",
        function: "Generation",
        energySupplier: "Engie",
        marketParticipant: "Producer",
        aggregator: "Main Aggregator",
        offeredServices: ["Flex", "Energy Community"],
        offeredProducts: [
            { name: "FCR Netherlands", active: true },
            { name: "aFRR Up Netherlands", active: false },
        ],
        owner: "John Smith",
        address: "Kraigherjeva ulica 2",
        city: "Lenart v Slovenskih Goricah",
        zipCode: "2230",
        country: "Slovenia",
        latitude: "59.3293",
        longitude: "18.0686",
        coordinates: { lat: 53.4808, lng: -2.2426 },
        available: true,
        grid: true,
        gridDetails: {
            maxImport: "500",
            maxExport: "200",
            phaseACurrent: "32",
            phaseBCurrent: "32",
            phaseCCurrent: "32",
        },
        pv: true,
        pvDetails: {
            peakPower: "100",
            maxExport: "90",
        },
        battery: true,
        batteryDetails: {
            totalCapacity: "250",
            maxImport: "50",
            maxExport: "50",
        },
        hvac: true,
        evse: true,
        evseDetails: {
            maxImportPower: "22",
        },
        flexUpMw: 2.5,
        flexDownMw: 1.8,
        dso: "DSO_SI_ELEKTRO_LJ",
        tso: "10YSI-ELES-----O",
        measurementPlaceNo: "6-25094",
        gsrn: "383111580135704442",
        meterNo: "M23456",
        alerts: "None",
        highestAlertImpact: "None",
        installationDate: "2024-01-15",
        lastUpdateTime: "2024-05-08T10:30:00Z",
        deactivatedTime: "",
        rampUpTime: "0.5",
        rampDownTime: "0.5",
        responseDelayTime: "5",
        regulationType: "continuous",
        siteId: "SITE_001",
    },
    {
        id: "2",
        name: "ELMA TT",
        type: "Unit",
        function: "Generation",
        energySupplier: "Engie",
        marketParticipant: "Producer",
        aggregator: "Main Aggregator",
        offeredServices: ["Flex", "Energy Community"],
        offeredProducts: [
            { name: "FCR Netherlands", active: true },
            { name: "aFRR Up Netherlands", active: false },
        ],
        owner: "Emma Johnson",
        address: "Predstruge 29",
        city: "Videm-Dobrepolj",
        zipCode: "1312",
        country: "Slovenia",
        latitude: "59.3293",
        longitude: "18.0686",
        coordinates: { lat: 53.4808, lng: -2.2426 },
        available: true,
        grid: true,
        gridDetails: {
            maxImport: "500",
            maxExport: "200",
            phaseACurrent: "32",
            phaseBCurrent: "32",
            phaseCCurrent: "32",
        },
        pv: true,
        pvDetails: {
            peakPower: "100",
            maxExport: "90",
        },
        battery: true,
        batteryDetails: {
            totalCapacity: "250",
            maxImport: "50",
            maxExport: "50",
        },
        hvac: true,
        evse: true,
        evseDetails: {
            maxImportPower: "22",
        },
        flexUpMw: 2.5,
        flexDownMw: 1.8,
        dso: "DSO_SI_ELEKTRO_LJ",
        tso: "10YSI-ELES-----O",
        measurementPlaceNo: "6-25095",
        gsrn: "383111580135704443",
        meterNo: "M23457",
        alerts: "None",
        highestAlertImpact: "None",
        installationDate: "2024-01-16",
        lastUpdateTime: "2024-05-08T10:30:00Z",
        deactivatedTime: "",
        rampUpTime: "0.5",
        rampDownTime: "0.5",
        responseDelayTime: "5",
        regulationType: "continuous",
        siteId: "SITE_002",
    },
    {
        id: "3",
        name: "Bitnje 137",
        type: "Unit",
        function: "Generation",
        energySupplier: "Engie",
        marketParticipant: "Producer",
        aggregator: "Main Aggregator",
        offeredServices: ["Flex", "Energy Community"],
        offeredProducts: [
            { name: "FCR Netherlands", active: true },
            { name: "aFRR Up Netherlands", active: false },
        ],
        owner: "David Taylor",
        address: "Zgornje Bitnje 137",
        city: "Kranj",
        zipCode: "4000",
        country: "Slovenia",
        latitude: "59.3293",
        longitude: "18.0686",
        coordinates: { lat: 53.4808, lng: -2.2426 },
        available: true,
        grid: true,
        gridDetails: {
            maxImport: "500",
            maxExport: "200",
            phaseACurrent: "32",
            phaseBCurrent: "32",
            phaseCCurrent: "32",
        },
        pv: true,
        pvDetails: {
            peakPower: "100",
            maxExport: "90",
        },
        battery: true,
        batteryDetails: {
            totalCapacity: "250",
            maxImport: "50",
            maxExport: "50",
        },
        hvac: true,
        evse: true,
        evseDetails: {
            maxImportPower: "22",
        },
        flexUpMw: 2.5,
        flexDownMw: 1.8,
        dso: "DSO_SI_ELEKTRO_LJ",
        tso: "10YSI-ELES-----O",
        measurementPlaceNo: "6-25096",
        gsrn: "383111580135704444",
        meterNo: "M23458",
        alerts: "None",
        highestAlertImpact: "None",
        installationDate: "2024-01-17",
        lastUpdateTime: "2024-05-08T10:30:00Z",
        deactivatedTime: "",
        rampUpTime: "0.5",
        rampDownTime: "0.5",
        responseDelayTime: "5",
        regulationType: "continuous",
        siteId: "SITE_003",
    },
];
