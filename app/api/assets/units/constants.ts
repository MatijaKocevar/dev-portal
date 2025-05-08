export const UNIT_FUNCTIONS = [
    "Generation",
    "Load",
    "Storage",
    "Hybrid",
    "Aggregated",
    "Virtual",
] as const;

export const MARKET_PARTICIPANTS = [
    "Balance Responsible Party",
    "Balance Service Provider",
    "Grid Operator",
    "Market Operator",
    "Party Connected to Grid",
    "Producer",
    "Consumer",
    "Capacity Trader",
    "Interconnection Trade Responsible",
] as const;

export const AGGREGATOR_TYPES = ["Main Aggregator", "Secondary Aggregator"] as const;

export const ENERGY_SUPPLIERS = [
    "Vattenfall",
    "E.ON",
    "Fortum",
    "Statkraft",
    "Uniper",
    "RWE",
    "Engie",
    "EDF",
    "Iberdrola",
    "Enel",
] as const;

export const DSO_OPERATORS = [
    { value: "DSO_SE_ELLEVIO", label: "Ellevio (Stockholm)" },
    { value: "DSO_SE_EON", label: "E.ON Energidistribution" },
    { value: "DSO_SE_VATTENFALL", label: "Vattenfall Eldistribution" },
    { value: "DSO_DE_ENWAG", label: "ENWAG (Wetzlar)" },
    { value: "DSO_DE_SWMNETZ", label: "SWM Infrastruktur (Munich)" },
    { value: "DSO_DE_WESTNETZ", label: "Westnetz (NRW)" },
    { value: "DSO_NL_STEDIN", label: "Stedin" },
    { value: "DSO_NL_LIANDER", label: "Liander" },
    { value: "DSO_NL_ENEXIS", label: "Enexis" },
    { value: "DSO_FR_ENEDIS", label: "Enedis" },
] as const;

export const TSO_OPERATORS = [
    { value: "10Y1001A1001A44P", label: "Sweden SE1 (Luleå)" },
    { value: "10Y1001A1001A45N", label: "Sweden SE2 (Sundsvall)" },
    { value: "10Y1001A1001A46L", label: "Sweden SE3 (Stockholm)" },
    { value: "10Y1001A1001A47J", label: "Sweden SE4 (Malmö)" },
    { value: "10YSE-1--------K", label: "Sweden (Svenska Kraftnät)" },
    { value: "10YNL----------L", label: "Netherlands (TenneT NL)" },
    { value: "10YFI-1--------U", label: "Finland (Fingrid)" },
] as const;

export const REGULATION_TYPES = ["continuous", "discrete"] as const;

export const OWNERS = [
    "John Smith",
    "Emma Johnson",
    "Michael Brown",
    "Sarah Wilson",
    "David Taylor",
    "Lisa Anderson",
    "James Martin",
    "Patricia Thompson",
    "Robert Davis",
    "Jennifer Garcia",
] as const;

export const OFFERED_PRODUCTS = {
    VPP: "FCR Netherlands",
    ENERGY_COMMUNITY: "aFRR Up Netherlands",
} as const;

export type UnitFunction = (typeof UNIT_FUNCTIONS)[number];
export type MarketParticipant = (typeof MARKET_PARTICIPANTS)[number];
export type AggregatorType = (typeof AGGREGATOR_TYPES)[number];
export type EnergySupplier = (typeof ENERGY_SUPPLIERS)[number];
export type RegulationType = (typeof REGULATION_TYPES)[number];
export type Owner = (typeof OWNERS)[number];
