import "swagger-ui-react/swagger-ui.css";
import "./styles.css";

import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
    ssr: true,
    loading: () => <p>Loading Component...</p>,
});

export default async function ApiDocsPage() {
    return (
        <section className="h-full w-full">
            <SwaggerUI url="https://staging.reduxi.energy/docs/api" />
        </section>
    );
}
