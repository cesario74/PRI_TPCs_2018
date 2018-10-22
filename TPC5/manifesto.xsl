<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">

    <xsl:output encoding="UTF-8" indent="yes" method="html"/>

    <xsl:template match="/">
        <html>
            <head>
                <meta charset="UTF-8"/>
            </head>
            <body>
                <h1 align="center">Manifesto</h1>
                <h3 align="center">
                    <xsl:value-of select="manifesto/meta/titulo"/>
                </h3>
                <table border="1" align="center">
                    
                    <xsl:apply-templates/>
                </table>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="meta">
        <td width="50%">
            <ul>
                <xsl:apply-templates/>
            </ul>
        </td>
    </xsl:template>

    <xsl:template match="id">
        <li>
            <b>Identificador:</b>
            <p>
                <xsl:value-of select="."/>
            </p>
        </li>
    </xsl:template>
    
    <xsl:template match="titulo">
    </xsl:template>

    <xsl:template match="subtitulo">
        <li>
            <b>Subtitulo:</b>
            <p>
                    <xsl:value-of select="."/>
            </p>
        </li>
    </xsl:template>

    <xsl:template match="dinicio">
        <li> 
            <b>Data de Inicio:</b>
            <p>
                <xsl:value-of select="."/>
            </p>
        </li>
    </xsl:template>

    <xsl:template match="dfim">
        <li> 
            <b>Data de Fim:</b>
            <p>
                <xsl:value-of select="."/>
            </p>
        </li>
    </xsl:template>

    <xsl:template match="supervisor">
        <li>
            <b>Supervisor:</b>
            <p>
                <a href="{website}">
                    <xsl:value-of select="nome"/>
                </a>
            </p>
        </li>
        <li>
            <b>Enviar Correio:</b>
            <p>
                <a href="mailto:{email}">
                    <xsl:value-of select="email"/>
                </a>
            </p>
        </li>
    </xsl:template>

    <xsl:template match="equipe">
        <td width="50%">
            <table>
                <xsl:apply-templates/>
            </table>
        </td>
    </xsl:template>

    <xsl:template match="elemento">
        <tr>
            <ul>
                <ul align="center">
                    <img src="{foto}"/>
                </ul>
                <li>
                    <b>Nome:</b>
                    <p>
                        <xsl:value-of select="nome"/>
                    </p>
                </li>
                <li>
                    <b>Número:</b>
                    <p>
                        A<xsl:value-of select="id"/>
                    </p>
                </li>
                <li>
                    <b>E-mail:</b>
                    <p>
                        <a href="mailto:{email}">
                            <xsl:value-of select="email"/>
                        </a>
                    </p>
                </li>
            </ul>
        </tr>

    </xsl:template>
    
    <xsl:template match="resumo">
        <table>
            <h2>Resumo</h2>     
            <xsl:apply-templates/> 
        </table>
    </xsl:template>
    
    <xsl:template match="para">
        <tr> 
            <ul style="list-style-type:none">
                <li>
                    <xsl:value-of select="."/>
                </li>
            </ul>
        </tr>
    </xsl:template>
    
    <xsl:template match="resultados">
        <table>
            <h2>Resultados</h2>     
            <xsl:apply-templates/> 
        </table>
    </xsl:template>
    
    <xsl:template match="resultado">
        <tr> 
            <ul style="list-style-type:square">
                <li>
                    <a href="{path}">
                        <xsl:value-of select="titulo"/>
                    </a>
                </li>
            </ul>
        </tr>
    </xsl:template>

</xsl:stylesheet>
