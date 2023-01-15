type Props = {
    children: React.ReactNode;
};

const SongListContainer = function ({ children }: Props) {
    return (
        <div className="flex flex-row flex-wrap justify-center gap-3 pt-5 md:gap-8 lg:gap-3">
            {children}
        </div>
    );
};

export default SongListContainer;
