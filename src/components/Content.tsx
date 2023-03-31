import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { BlackoutLoading } from './Loading';
import { Dialog } from 'primereact/dialog';
import { ProgressBar } from 'primereact/progressbar';
import * as Service from '../services/index'

const Content: React.FC = () => {
    const [keyword, setKeyword] = useState<string>("")
    const [searchKeyword, setSearchKeyword] = useState<string>("")
    const [clickSearch, setClickSearch] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [dataList, setDataList] = useState<any[]>([])
    const [errorDialog, setErrorDialog] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [detailsDialog, setDetailsDialog] = useState<boolean>(false)
    const [detailsPokemon, setDetailsPokemon] = useState<any>({})
    const [urlNextPage, setUrlNextPage] = useState<string>("")

    const search = async () => {
        setClickSearch(false)
        setSearchKeyword("")
        if (keyword) {
            setSearchKeyword(keyword)
            setClickSearch(true)
            await getList("search")
        } else if (!keyword) {
            await getList("")
        }
    }

    const getList = async (type: string) => {
        setLoading(true)
        var dataPokemon = []
        if (!type) {
            try {
                const response = await Service.listPokemon('');

                if (Array.isArray(response?.results)) {
                    dataPokemon = response.results
                    setUrlNextPage(response.next)
                }

            } catch (err: any) {
                setErrorMessage(err)
                setErrorDialog(true)
                throw err;
            }
        } else if (type === 'more') {
            setLoading(true)
            try {
                const response = await Service.listPokemon(urlNextPage);

                if (Array.isArray(response?.results)) {
                    dataPokemon = response.results
                    setUrlNextPage(response.next)
                }

            } catch (err: any) {
                setErrorMessage(err)
                setErrorDialog(true)
                throw err;
            }
        } else if (type === 'search') {
            setLoading(true)
            try {
                const response = await Service.searchTypePokemon(keyword);

                if (Array.isArray(response?.pokemon)) {
                    // dataPokemon = response.pokemon
                    dataPokemon = response.pokemon.map((item: any) => {
                        return {
                            name: item.pokemon.name,
                            url: item.pokemon.url
                        }
                    })
                }

            } catch (err: any) {
                setErrorMessage(err)
                setErrorDialog(true)
                throw err;
            }
        }

        if (!type || type === "search") {
            let dataPok = []
            for (let i = 0; i < dataPokemon.length; i++) {
                const res = await getPokemonById(dataPokemon[i].url)
                dataPok.push(res)
            }

            for (let i = 0; i < dataPokemon.length; i++) {
                dataPokemon[i].data = dataPok[i]
            }

            // console.log(dataPokemon)
            setDataList(dataPokemon)
            setLoading(false)
        } else if (type === "more") {
            let dataPok = []
            for (let i = 0; i < dataPokemon.length; i++) {
                const res = await getPokemonById(dataPokemon[i].url)
                dataPok.push(res)
            }

            for (let i = 0; i < dataPokemon.length; i++) {
                dataPokemon[i].data = dataPok[i]
            }

            // console.log(dataPokemon)
            // setDataList(dataPokemon)
            dataList.push(...dataPokemon)
            setLoading(false)
        }
    }

    const getPokemonById = async (id: any) => {
        try {
            const response = await Service.pokemonById(id);
            // setLoading(false)
            return response
        } catch (err: any) {
            setErrorMessage(err)
            setErrorDialog(true)
            throw err;
        } finally {
            // setLoading(false)
        }
    }

    useEffect(() => {
        getList("")
    }, [])

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const clickDetail = (data: any) => {
        setDetailsPokemon(data)
        setDetailsDialog(true)
        // console.log(data)
    }

    return (
        <>
            <div className="content" style={{ marginBottom: '2rem' }}>
                <div className='grid col-12'>
                    <div className='col-12 md:col-10'>
                        <span className="p-input-icon-left" style={{ width: '100%' }}>
                            <i className="pi pi-search" style={{ marginLeft: '8px' }} />
                            <InputText style={{ width: '100%', borderRadius: '1rem', paddingLeft: '2.5rem' }} value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search Type Pokemon" />
                        </span>
                    </div>
                    <div className='col-12 md:col-2'>
                        <Button icon="pi pi-search" className="p-button-primary" label='Search' style={{ width: '100%', borderRadius: '1rem' }} onClick={() => search()} />
                    </div>
                </div>
                <div className='col-12 fluid'>

                    {
                        clickSearch &&
                        <p className='font-montserrat' style={{ margin: '0 0 1rem 0' }}>Showing Pokemon Type for <strong>"{searchKeyword}"</strong></p>
                    }

                    <div className='col-12 grid'>
                        {
                            dataList?.length > 0 && dataList?.map((item, i) => {
                                return (
                                    <div className='col-12 md:col-4'>
                                        <div className={item?.data?.types[0]?.type?.name ? `col-12 grid bg-${item.data.types[0].type.name}` : 'col-12 grid bg-unknown'} style={{ border: '1px solid black', borderRadius: '5px', cursor: 'pointer' }}>
                                            <div className='col-12 md:col-8 font-montserrat' style={{ textAlign: 'left', fontSize: '20px' }} onClick={() => clickDetail(item)} >
                                                <p>{item.name ? capitalizeFirstLetter(item.name) : '-'}</p>
                                                <div className='col-12 grid'>
                                                    {
                                                        item?.data?.types?.map((typePokemon: any) => {
                                                            return (
                                                                <div className='col-12 md:col-3' style={{ border: '1px solid #fff', padding: '5px 1rem', width: 'auto', borderRadius: '1rem', margin: '5px', fontSize: '14px' }}>
                                                                    <p style={{ margin: '0' }}>{typePokemon.type.name ? capitalizeFirstLetter(typePokemon.type.name) : "-"}</p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className='col-12 md:col-4'>
                                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.data.id}.png`} style={{ width: "100%", maxWidth: '7rem' }} alt="pokemon" onClick={() => clickDetail(item)} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {
                        dataList?.length > 0 && clickSearch === false &&
                        <div className='col-12 grid' style={{ marginTop: '1rem' }}>
                            <Button style={{ width: '100%', textAlign: 'center', justifyContent: 'center', fontSize: '1.2rem', cursor: 'pointer' }} onClick={() => getList('more')}>Load More</Button>
                        </div>
                    }

                </div>
            </div>
            <BlackoutLoading loading={loading} />

            <Dialog blockScroll={true} className="dialog-response-fail" header={"Error"} visible={errorDialog} onHide={() => setErrorDialog(false)} breakpoints={{ '960px': '75vw' }} style={{ width: '40vw' }} draggable={false}>
                <div className="p-col-12 p-d-flex">
                    <p style={{ marginLeft: '10px', width: '100%' }}>{errorMessage}</p>
                </div>
                <div className="p-col-12" style={{ textAlign: 'end', marginTop: '0.5rem' }}>
                    <Button label="OK" style={{ textAlign: 'center', width: '5rem', backgroundColor: '#D01224' }} onClick={() => setErrorDialog(false)} />
                </div>
            </Dialog>

            {/* Dialog Details */}
            <Dialog blockScroll={true}
                className={detailsPokemon?.data?.types[0]?.type?.name ? `dialog-details detail-bg-${detailsPokemon?.data.types[0].type.name}` : 'dialog-details detail-bg-unknown'}
                header={detailsPokemon.name ? capitalizeFirstLetter(detailsPokemon.name) : "-"}
                visible={detailsDialog}
                onHide={() => setDetailsDialog(false)}
                breakpoints={{ '960px': '75vw' }}
                style={{ width: '50vw' }}
                draggable={false}>

                <div className='col-12 fluid'>

                    <div className='col-12 grid font-montserrat'>
                        <div className='col-12 md:col-6'>
                            <p style={{ marginLeft: '1rem', fontSize: '24px', fontWeight: 'bold' }}>{detailsPokemon.name ? capitalizeFirstLetter(detailsPokemon.name) : '-'}</p>
                            <div className='col-12 grid'>
                                {
                                    detailsPokemon?.data?.types?.map((typePokemon: any) => {
                                        return (
                                            <div className='col-12 md:col-3' style={{ border: '1px solid #1b1b1b', padding: '5px 1rem', width: 'auto', borderRadius: '1rem', margin: '5px', fontSize: '14px' }}>
                                                <p style={{ margin: '0' }}>{typePokemon.type.name ? capitalizeFirstLetter(typePokemon.type.name) : "-"}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='col-12 fluid'>
                                <p style={{ margin: '0' }}>Experience: {detailsPokemon?.data?.base_experience}</p><hr />
                                <p style={{ margin: '0' }}>Height: {detailsPokemon?.data?.height}</p><hr />
                                <p style={{ margin: '0' }}>Weight: {detailsPokemon?.data?.weight}</p><hr />
                            </div>
                        </div>

                        <div className='col-12 md:col-6' style={{ textAlign: 'center' }}>
                            <img style={{ height: '17rem' }} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detailsPokemon?.data?.id}.png`} />
                        </div>
                    </div>

                    <div className='col-12 fluid'>
                        {
                            [{ name: "HP", value: detailsPokemon?.data?.stats[0]?.base_stat }, { name: "Attack", value: detailsPokemon?.data?.stats[1]?.base_stat }, { name: "Defense", value: detailsPokemon?.data?.stats[2]?.base_stat }, { name: "Special-Attack", value: detailsPokemon?.data?.stats[3]?.base_stat }, { name: "Special-Defense", value: detailsPokemon?.data?.stats[4]?.base_stat }, { name: "Speed", value: detailsPokemon?.data?.stats[5]?.base_stat }].map((item: any) => {
                                return (
                                    <div className='col-12 grid'>
                                        <div className='col-12 md:col-2' style={{ textAlign: 'center' }}>
                                            <p style={{ margin: '0' }}>{item.name}</p>
                                        </div>
                                        <div className='col-12 md:col-10'>
                                            <ProgressBar value={item.value} className={detailsPokemon?.data?.types[0]?.type?.name ? `${detailsPokemon?.data.types[0].type.name}` : 'unknown'}></ProgressBar>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

            </Dialog>
        </>
    );
}

export default Content;