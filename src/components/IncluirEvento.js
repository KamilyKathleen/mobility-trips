import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Card,
    CardContent,
    Alert,
} from '@mui/material';

function IncluirEvento() {
    const [form, setForm] = useState({
        idProg: '139068',
        codigo: '12',
        data: '2024-05-23T19:09:33.469Z',
        obs: 'Falar Urgente Monitoramentox',
        latitude: '-29.6840056',
        longitude: '-51.1443334',
        cd_ocorr: '123',
        viagem: '2668362',
        tipo: '1',
    });

    const [resultado, setResultado] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setResultado(null);

        try {
            const response = await fetch(
                // "https://orionbr.cevalogistics.com/wcf/milkrun/Servicos/EventoService.svc/SalvarEvento",
                'https://qa3orionbr-preprod.cevalogistics.com/Ocelot/milkrun/servicos/EventoService.svc/SalvarEvento',
                {
                    method: 'POST',
                    headers: {
                        idProg: form.idProg,
                        codigo: form.codigo,
                        data: form.data,
                        obs: form.obs,
                        latitude: form.latitude,
                        longitude: form.longitude,
                        cd_ocorr: form.cd_ocorr,
                        viagem: form.viagem,
                        tipo: form.tipo,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ foto: '' }),
                }
            );

            const data = await response.json();
            setResultado(data?.SalvarEventoResult);
        } catch (error) {
            setResultado({ executouok: false, erro: 'Erro na requisição' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 6 }}>
            <Typography variant="h4" gutterBottom align='center'>
                Inclusão de Evento
            </Typography>

            <Box
                component="form"
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                {[
                    { label: 'ID Programa', name: 'idProg' },
                    { label: 'Código', name: 'codigo' },
                    { label: 'Data', name: 'data' },
                    { label: 'Observação', name: 'obs' },
                    { label: 'Latitude', name: 'latitude' },
                    { label: 'Longitude', name: 'longitude' },
                    { label: 'Código Ocorrência', name: 'cd_ocorr' },
                    { label: 'Viagem', name: 'viagem' },
                    { label: 'Tipo', name: 'tipo' },
                ].map((field) => (
                    <TextField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        fullWidth
                    />
                ))}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{ boxShadow: 3 }}
                >
                    {loading ? 'Enviando...' : 'Incluir Evento'}
                </Button>
            </Box>

            {resultado && (
                <Card sx={{ mt: 4 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Resultado da Inclusão
                        </Typography>

                        {resultado.executouok ? (
                            <Alert severity="success">Evento incluído com sucesso!</Alert>
                        ) : (
                            <Alert severity="error">
                                Erro ao incluir evento: {resultado.erro || 'Desconhecido'}
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            )}
        </Container>
    );
}

export default IncluirEvento;
