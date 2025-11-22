interface AuthLayoutProps {
  title: string;
  supportingTxt: React.ReactNode;
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  supportingTxt,
  children,
}: AuthLayoutProps) {
  return (
    <section className="flex-1 px-6 py-12 lg:px-8 p-8 flex flex-row justify-center items-center gap-6 w-full pt-20">
      <div className="hidden basis-[100px] md:basis-[200px] sm:flex justify-end items-center">
        <img
          src="/src/assets/images/the-pathfinder.png"
          alt=""
          width={300}
          height={280}
        />
      </div>
      <div className="flex-1 max-w-lg px-10 bg-hero-fallback rounded-lg flex flex-col justify-center items-center py-12">
        <div className="sm:mx-auto sm-w-full sm:max-w-sm">
          <h3>{title}</h3>
          {supportingTxt}
        </div>
        <div className="mt-8 w-full">{children}</div>
      </div>
    </section>
  );
}
